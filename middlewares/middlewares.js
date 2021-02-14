import { send } from "../deps.js";
const authorizationMiddleware = async (
  { request, response, session },
  next,
) => {
  const pathname = request.url.pathname;
  if (
    pathname === "/" || pathname.startsWith("/api") ||
    pathname.startsWith("/auth")
  ) {
    await next();
  } else {
    if (session && await session.get("authenticated")) {
      await next();
    } else {
      response.redirect("/auth/login");
    }
  }
};
const errorMiddleware = async (context, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
  }
};

const requestTimingMiddleware = async ({ request, session }, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  const user = await session.get("user");

  // console.log(user);
  if (user) {
    console.log(
      "Date: " + new Date() +
        `method: ${request.method} ${request.url.pathname} - ${ms} ms` +
        ` user id: ${user.id}`,
    );
  } else {
    console.log(
      "Date: " + new Date() +
        `method: ${request.method} ${request.url.pathname} - ${ms} ms user id: anonymous`,
    );
  }
};

const serveStaticFilesMiddleware = async (context, next) => {
  if (context.request.url.pathname.startsWith("/static")) {
    const path = context.request.url.pathname.substring(7);

    await send(context, path, {
      root: `${Deno.cwd()}/static`,
    });
  } else {
    await next();
  }
};

export {
  authorizationMiddleware,
  errorMiddleware,
  requestTimingMiddleware,
  serveStaticFilesMiddleware,
};
