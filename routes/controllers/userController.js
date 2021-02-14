import * as service from "../../services/userService.js";
import { bcrypt, REDIRECT_BACK } from "../../deps.js";
//report project
const createUser = async ({ request, response, render, session }) => {
  const params = await request.body().value;
  const email = params.get("email");
  const password = params.get("password");
  const verification = params.get("verification");
  console.log(email);

  // the verification is wrong
  // show verification error
  if (password != verification || password.length > 4) {
    response.status = 400;
    response.body =
      "The password must have at least 4 characters\n or Those passwords didn't match. Try again. ";
    return;
  }

  const existingUsers = await service.getUserByEmail(email);
  //the account has existed
  //show exist error
  // console.log(existingUsers[0]);
  if (existingUsers.length > 0) {
    const data = {
      errorExistUser: "The email is already reserved. Try another one.",
    };
    const user = await session.get("user");
    if (user) {
      data.email = user.email;
    } else {
      data.email = null;
    }
    data.existedEmail = email;
    render("/user/registration.ejs", data);
    return;
  }

  const passwordHash = await bcrypt.hash(password);

  //create user to database
  await service.addUser(email, passwordHash);

  response.redirect(REDIRECT_BACK, "/auth/login");
  return;
};

const tryLogin = async ({ request, response, render, session }) => {
  const params = await request.body().value;
  const email = params.get("email");
  const password = params.get("password");

  const data = {
    errorNoUserOrWrongPwd: "",
    warningSignedIn: "",
  };
  const loginUser = await session.get("user");
  if (loginUser) {
    data.email = loginUser.email;
  } else {
    data.email = null;
  }
  const existingUsers = await service.getUserByEmail(email);
  //the account has existed
  //show exist error
  if (existingUsers.length === 0) {
    data.errorNoUserOrWrongPwd = "Invalid email or password";
    render("/user/login.ejs", data);
    return;
  }

  //get hash from database
  const user = existingUsers[0];
  //the pwd is wrong
  //show pwd error
  if (!await bcrypt.compare(password, user.password)) {
    data.errorNoUserOrWrongPwd = "Invalid email or password";
    // console.log(data);
    render("/user/login.ejs", data);
    return;
  }

  //set session
  await session.set("authenticated", true);
  await session.set("user", {
    id: user.id,
    email: user.email,
  });
  // console.log(await session.get("user"));
  // console.log(await session.get("authenticated"));
  response.redirect(REDIRECT_BACK, "/");
};
const tryLogout = async ({ session, response }) => {
  await session.set("authenticated", false);
  await session.set("user", {});
  response.redirect(REDIRECT_BACK, "/");
};

const showRegistration = async ({ render, session }) => {
  const data = {
    errorExistUser: "",
  };
  const user = await session.get("user");
  if (user) {
    data.email = user.email;
  } else {
    data.email = null;
  }
  data.existedEmail = "";
  render("/user/registration.ejs", data);
};
const showLogin = async ({ render, session }) => {
  const data = {
    errorNoUserOrWrongPwd: "",
    warningSignedIn: "",
  };
  if (await session.get("authenticated")) {
    data.warningSignedIn = "Already signed in";
  }
  const user = await session.get("user");
  if (user) {
    data.email = user.email;
  } else {
    data.email = null;
  }
  render("/user/login.ejs", data);
};

export { createUser, showLogin, showRegistration, tryLogin, tryLogout };
