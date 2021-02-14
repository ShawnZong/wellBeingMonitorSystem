import * as service from "../../services/apiService.js";
const get7DaysSummaryAllUsers = async ({ response }) => {
  response.body = await service.get7DaysSummaryAllUsers();
  return;
};
const get1DaysSummaryAllUsers = async ({ response, params }) => {
  const year = params.year;
  const month = params.month - 1;
  const day = params.day;
  const date = new Date(year, month, day);
  const result = await service.get1DaysSummaryAllUsers(date);
  console.log(date);
  console.log(result);
  response.body = result;
  return;
};
export { get1DaysSummaryAllUsers, get7DaysSummaryAllUsers };
