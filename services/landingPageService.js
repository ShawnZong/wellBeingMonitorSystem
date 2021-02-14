import { executeQuery } from "../database/database.js";
import { addDays } from "./summaryService.js";
const getAvgMood = async () => {
  const data = {
    avgMoodToday: "",
    avgMoodYesterday: "",
    moodBetter: "",
  };
  const dateToday = new Date();
  const dateYesterday = addDays(dateToday, -1);
  const resultAvgMoodToday = await executeQuery(
    "SELECT AVG(mood) AS avg_mood FROM report\
        WHERE add_date=$1;",
    dateToday
  );
  console.log("start resultAvgMoodToday query");
  if (!resultAvgMoodToday) {
    data.avgMoodToday = 0;
  } else {
    if (resultAvgMoodToday.rowCount > 0) {
      data.avgMoodToday = resultAvgMoodToday.rowsOfObjects()[0].avg_mood;
    }
  }

  console.log("finish resultAvgMoodToday query");

  const resultAvgMoodYesterday = await executeQuery(
    "SELECT AVG(mood) AS avg_mood FROM report\
            WHERE add_date=$1;",
    dateYesterday
  );

  if (!resultAvgMoodYesterday) {
    data.avgMoodYesterday = 0;
  } else {
    if (resultAvgMoodYesterday.rowCount > 0) {
      data.avgMoodYesterday = resultAvgMoodYesterday.rowsOfObjects()[0].avg_mood;
    }
  }

  if (data.avgMoodToday >= data.avgMoodYesterday) {
    data.moodBetter = true;
  } else {
    data.moodBetter = false;
  }
  data.avgMoodToday = Number(data.avgMoodToday).toFixed(2);
  data.avgMoodYesterday = Number(data.avgMoodYesterday).toFixed(2);

  return data;
};

export { getAvgMood };
