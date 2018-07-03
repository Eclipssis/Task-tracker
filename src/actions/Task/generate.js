import createTask from "../../helpers/createTask";
import { GENERATE_TASKS } from '../actionsTypes'

function randomDate(starHour, endHour, starMinutes, endMinutes) {

  let currentDay = new Date().getDate();
  let date       = new Date(2018, 10, currentDay);
  let hour       = Math.random() * (endHour - starHour) + starHour;
  let minutes    = Math.random() * (endMinutes - starMinutes) + starMinutes;
  date.setHours(hour);
  date.setMinutes(minutes);
  return date;
}

export default function generateTask() {

  let dummyData = [];
  let minTasks = 10;
  let maxTasks = 15;
  let counter = 0;
  let taskCount = Math.random() * (maxTasks - minTasks) + minTasks;

  for (let i = 1; i < taskCount + 1; i++) {

    let taskTitle = 'Task title - ' + i;
    let startTime = randomDate(counter, counter, 0, 10);
    let endTime = randomDate(counter, counter + 2, 20, 30);

    let dummyTask = createTask(i, taskTitle, startTime, endTime);
    dummyData.push(dummyTask);
    counter += 2;
  }

  return {
    type: GENERATE_TASKS,
    payload: dummyData
  }
}