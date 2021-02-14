FROM hayd/alpine-deno:1.6.3
EXPOSE 7777
WORKDIR /app
COPY config database middlewares routes services static test views app.js deps.js ./

CMD [ "run","--allow-net","--unstable","--allow-read","--allow-env","--allow-write","app.js"]