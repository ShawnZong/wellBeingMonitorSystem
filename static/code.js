//registration.ejs
const verifyPwd = () => {
  const password = document.querySelector("#password").value;
  const verification = document.querySelector("#verification").value;

  document.querySelector("#registerButton").disabled = true;

  if (password.length >= 4) {
    document.querySelector("#pwdLengthWarn").innerHTML = "";
  } else {
    document.querySelector("#pwdLengthWarn").innerHTML =
      "The password must have at least 4 characters";
  }

  if (password !== verification) {
    document.querySelector("#verificationWarn").innerHTML =
      "Those passwords didn't match. Try again.";
  } else {
    document.querySelector("#verificationWarn").innerHTML = "";
    document.querySelector("#registerButton").disabled = false;
  }
};

// report.ejs;
for (const element of document.getElementsByName("date")) {
  element.valueAsDate = new Date();
}
