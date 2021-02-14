import { Router } from "../deps.js";
import { showLanding } from "./controllers/landingPageController.js";
import {
  createUser,
  showLogin,
  showRegistration,
  tryLogin,
  tryLogout,
} from "./controllers/userController.js";
import { addReport, showReportForm } from "./controllers/reportController.js";
import {
  showMonthlySummary,
  showSummary,
  showWeeklySummary,
} from "./controllers/summaryController.js";
import {
  get1DaysSummaryAllUsers,
  get7DaysSummaryAllUsers,
} from "./apis/summaryApi.js";
const router = new Router();

//report project
//user registration
router.get("/auth/registration", showRegistration);
router.post("/auth/registration", createUser);

//user login
router.get("/auth/login", showLogin);
router.post("/auth/login", tryLogin);

//user logout
router.get("/auth/logout", tryLogout);

//report
router.get("/behavior/reporting", showReportForm);
router.post("/behavior/reporting", addReport);

//summary
router.get("/behavior/summary", showSummary);
router.post("/behavior/summary/weekly", showWeeklySummary);
router.post("/behavior/summary/monthly", showMonthlySummary);

//api
router.get("/api/summary", get7DaysSummaryAllUsers);
router.get("/api/summary/:year/:month/:day", get1DaysSummaryAllUsers);

router.get("/", showLanding);

export { router };
