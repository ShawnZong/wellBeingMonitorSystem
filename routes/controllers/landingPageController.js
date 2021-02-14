import { getAvgMood } from "../../services/landingPageService.js";
const showLanding = async ({ render, session }) => {
  const data = await getAvgMood();

  const user = await session.get("user");
  if (user) {
    data.email = user.email;
  } else {
    data.email = null;
  }
  // console.log(data);
  render("index.ejs", data);
};
export { showLanding };
