import formatToDisplay from "./formatToDisplay";
import convertDate from "./convertDate";
import getTimeDifference from "./getTimeDifference";

export default function createTask(id, taskTitle, taskStart, taskEnd) {

  let timeDiff = getTimeDifference(taskStart, taskEnd);

  let totalTimeSpend = formatToDisplay(timeDiff.hours) + ':'
    + formatToDisplay(timeDiff.minutes) + ':'
    + formatToDisplay(timeDiff.seconds);

  return {
    id: id,
    title: taskTitle,
    start: convertDate(taskStart),
    end: convertDate(taskEnd),
    timeSpend: totalTimeSpend,
  }
}