import { executeQuery } from "../database/database.js";

//report project
const getReportByUseridTypeDate = async (report) => {
  const result = await executeQuery(
    "SELECT * FROM report WHERE user_id=$1 AND type=$2 AND add_date=$3; ",
    report.id,
    report.type,
    report.date,
  );
  // console.log(result.rowsOfObjects());
  return result.rowsOfObjects();
};

const addReport = async (report) => {
  if (report.type === 1) {
    //check whether the date has been reported, update it
    const result = await getReportByUseridTypeDate(report);

    if (result.length > 0) {
      await executeQuery(
"UPDATE report \
          SET mood=$1,sleep_time=$2,sleep_quality=$3 \
          WHERE user_id=$4 AND type=$5 AND add_date=CURRENT_DATE; ",
        report.mood,
        report.sleepDuration,
        report.sleepQuality,
        report.id,
        report.type,
      );
      return;
    }
    //the date has not been reported, insert new report
    await executeQuery(
"INSERT INTO \
    report (user_id,type,add_date,mood,sleep_time,sleep_quality)\
     VALUES($1,$2,$3,$4,$5,$6);",
      report.id,
      report.type,
      report.date,
      report.mood,
      report.sleepDuration,
      report.sleepQuality,
    );
  }

  //evening report
  if (report.type === 0) {
    const result = await getReportByUseridTypeDate(report);
    //check whether the date has been reported, update it
    if (result.length > 0) {
      await executeQuery(
"UPDATE report \
              SET mood=$1,sport_exercise_time=$2,study_time=$3 ,eat_regularity_quality=$4\
              WHERE user_id=$5 AND type=$6 AND add_date=CURRENT_DATE; ",
        report.mood,
        report.sportExerciseTime,
        report.studyTime,
        report.eatRegularityQuality,
        report.id,
        report.type,
      );
      return;
    }
    //the date has not been reported, insert new report
    await executeQuery(
"INSERT INTO \
  report (user_id,type,add_date,mood,sport_exercise_time,study_time,eat_regularity_quality)\
     VALUES($1,$2,$3,$4,$5,$6,$7);",
      report.id,
      report.type,
      report.date,
      report.mood,
      report.sportExerciseTime,
      report.studyTime,
      report.eatRegularityQuality,
    );
  }
};

export { addReport, getReportByUseridTypeDate };
