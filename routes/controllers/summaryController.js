import * as service from "../../services/summaryService.js";

const showSummary = async ({ params, request, render, session }) => {
  const user = await session.get("user");

  //current date
  const date = new Date();
  const data = {
    date: date,
    summaryWeekly: await service.getWeeklySummary(user, date),
    summaryMonthly: await service.getMonthlySummary(user, date),
  };
  // console.log(data);

  data.email = user.email;
  render("/summary/summary.ejs", data);
};
const showWeeklySummary = async ({ request, render, session }) => {
  const user = await session.get("user");
  const params = await request.body().value;
  // console.log("what");
  // console.log(params.get("date"));
  const dateParts = params.get("date").split("-");
  // console.log(dateParts);
  const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  // console.log(date);
  const data = {
    date: date,
    summaryWeekly: await service.getWeeklySummary(user, date),
    summaryMonthly: "",
  };
  data.email = user.email;
  render("/summary/summary.ejs", data);
};
const showMonthlySummary = async ({ request, render, session }) => {
  const user = await session.get("user");
  const params = await request.body().value;
  // console.log("what");
  // console.log(params.get("date"));
  const dateParts = params.get("date").split("-");
  // console.log(dateParts);
  const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  // console.log(date);

  const data = {
    date: date,
    summaryWeekly: "",
    summaryMonthly: await service.getMonthlySummary(user, date),
  };
  data.email = user.email;
  render("/summary/summary.ejs", data);
};

export { showMonthlySummary, showSummary, showWeeklySummary };
