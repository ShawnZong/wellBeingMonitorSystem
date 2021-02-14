import * as service from "../../services/reportService.js";
import { REDIRECT_BACK } from "../../deps.js";
//report project

const addReport = async ({ request, response, render, session }) => {
  const data = {
    authenticated: false,
  };
  data.email = null;
  if (await session.get("authenticated") !== true) {
    render("/report/report.ejs", data);
    return;
  }

  const user = await session.get("user");
  const params = await request.body().value;
  const type = Number(params.get("type"));
  //   console.log("before morning");
  //   console.log(type);
  console.log(params);
  console.log(params.get("date"));
  //morning
  if (type === 1) {
    // console.log(type);
    const report = {
      id: user.id,
      type: 1,
      date: params.get("date"),
      mood: params.get("mood"),
      sleepDuration: params.get("sleepDuration"),
      sleepQuality: params.get("sleepQuality"),
    };
    // console.log(report);
    await service.addReport(report);
  }
  //evening
  if (type === 0) {
    // console.log(type);
    const report = {
      id: user.id,
      type: 0,
      date: params.get("date"),
      mood: params.get("mood"),
      sportExerciseTime: params.get("sportExerciseTime"),
      studyTime: params.get("studyTime"),
      eatRegularityQuality: params.get("eatRegularityQuality"),
    };
    // console.log(report);
    await service.addReport(report);
  }
  response.redirect(REDIRECT_BACK, "/behavior/reporting");
};

const showReportForm = async ({ render, session }) => {
  const data = {
    authenticated: false,
    filledMorning: false,
    filledEvening: false,
  };

  if (await session.get("authenticated") === true) {
    data.authenticated = true;
  } else {
    data.email = null;

    render("/report/report.ejs", data);
    return;
  }
  const user = await session.get("user");
  //check morning report
  const tmpReport = {
    id: user.id,
    type: 1,
    date: new Date(),
  };
  let result = await service.getReportByUseridTypeDate(tmpReport);
  if (result.length > 0) {
    data.filledMorning = true;
  }
  //check evening
  tmpReport.type = 0;
  result = await service.getReportByUseridTypeDate(tmpReport);
  if (result.length > 0) {
    data.filledEvening = true;
  }
  data.email = user.email;
  render("/report/report.ejs", data);
  return;
};

export { addReport, showReportForm };
