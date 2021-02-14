import { executeQuery } from "../database/database.js";
const addDays = (date, days) => {
  var newDate = new Date();
  newDate.setDate(date.getDate() + days);
  return newDate;
};
const getWeeklySummary = async (user, date) => {
  const date7Ago = addDays(date, -7);
  const resultAvgMood = await executeQuery(
"SELECT AVG(mood) AS avg_mood FROM report\
    WHERE user_id=$1 AND (add_date BETWEEN $2 AND $3);",
    user.id,
    date7Ago,
    date,
  );

  const avgMood = resultAvgMood.rowsOfObjects()[0];
  if (!avgMood.avg_mood) {
    return "";
  }
  // SELECT AVG(sleep_time) AS avg_sleep_time,AVG(sleep_quality) AS avg_sleep_quality FROM report WHERE user_id=5 AND type=1 ;
  const resultAvgMorning = await executeQuery(
"SELECT AVG(sleep_time) AS avg_sleep_time,AVG(sleep_quality) AS avg_sleep_quality FROM report \
  WHERE user_id=$1 AND type=1 AND (add_date BETWEEN $2 AND $3);",
    user.id,
    date7Ago,
    date,
  );
  if (resultAvgMorning.rowCount === 0) {
    return "";
  }
  const avgMorning = resultAvgMorning.rowsOfObjects()[0];

  const resultAvgEvening = await executeQuery(
"SELECT AVG(sport_exercise_time) as avg_sport_exercise_time,AVG(study_time) AS avg_study_time,AVG(eat_regularity_quality) AS avg_eat_regularity_quality FROM report \
      WHERE user_id=$1 AND type=0 AND (add_date BETWEEN $2 AND $3);",
    user.id,
    date7Ago,
    date,
  );
  if (resultAvgEvening.rowCount === 0) {
    return "";
  }

  const avgEvening = resultAvgEvening.rowsOfObjects()[0];
  const data = {
    avgSleepTime: Number(avgMorning.avg_sleep_time).toFixed(2),
    avgSportExerciseTime: Number(avgEvening.avg_sport_exercise_time).toFixed(2),
    avgStudyTime: Number(avgEvening.avg_study_time).toFixed(2),
    avgSleepQuality: Number(avgMorning.avg_sleep_quality).toFixed(2),
    avgMood: Number(avgMood.avg_mood).toFixed(2),
  };
  return data;
};
const getMonthlySummary = async (user, date) => {
  const date30Ago = addDays(date, -30);
  const resultAvgMood = await executeQuery(
"SELECT AVG(mood) AS avg_mood FROM report\
    WHERE user_id=$1 AND (add_date BETWEEN $2 AND $3);",
    user.id,
    date30Ago,
    date,
  );
  const avgMood = resultAvgMood.rowsOfObjects()[0];
  if (!avgMood.avg_mood) {
    return "";
  }

  const resultAvgMorning = await executeQuery(
"SELECT AVG(sleep_time) AS avg_sleep_time,AVG(sleep_quality) AS avg_sleep_quality FROM report \
  WHERE user_id=$1 AND type=1 AND (add_date BETWEEN $2 AND $3);",
    user.id,
    date30Ago,
    date,
  );
  const avgMorning = resultAvgMorning.rowsOfObjects()[0];

  const resultAvgEvening = await executeQuery(
"SELECT AVG(sport_exercise_time) as avg_sport_exercise_time,AVG(study_time) AS avg_study_time,AVG(eat_regularity_quality) AS avg_eat_regularity_quality FROM report \
      WHERE user_id=$1 AND type=0 AND (add_date BETWEEN $2 AND $3);",
    user.id,
    date30Ago,
    date,
  );
  const avgEvening = resultAvgEvening.rowsOfObjects()[0];

  const data = {
    avgSleepTime: Number(avgMorning.avg_sleep_time).toFixed(2),
    avgSportExerciseTime: Number(avgEvening.avg_sport_exercise_time).toFixed(2),
    avgStudyTime: Number(avgEvening.avg_study_time).toFixed(2),
    avgSleepQuality: Number(avgMorning.avg_sleep_quality).toFixed(2),
    avgMood: Number(avgMood.avg_mood).toFixed(2),
  };
  return data;
};

export { addDays, getMonthlySummary, getWeeklySummary };
