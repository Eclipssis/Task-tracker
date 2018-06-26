// let taskList = localStorage.getItem('tasks');
// taskList = JSON.parse(taskList) ? JSON.parse(taskList) : [];

const initialTasks = [

  {id: 1, title: "Learn react", start: '26.06.2018 01:15:30', end: '26.06.2018 04:00:50', timeSpend: "01:00:06"},
  {id: 2, title: "Learn redux", start: '26.06.2018 18:30:30', end: '26.06.2018 18:40:40', timeSpend: "00:10:20"},
  {id: 3, title: "Init project", start: '26.06.2018 17:42:24', end: '26.06.2018 17:42:24', timeSpend: "00:00:02"},
  {id: 4, title: "Create timer", start: '26.06.2018 12:10:00', end: '26.06.2018 12:20:00', timeSpend: "00:05:00"},
  {id: 5, title: "Create timer", start: '26.06.2018 12:40:00', end: '26.06.2018 12:50:00', timeSpend: "00:05:00"},
  {id: 6, title: "Add crud", start: '26.06.2018 13:20:00', end: '26.06.2018 13:30:00', timeSpend: "00:35:00"},
  {id: 7, title: "Add crud", start: '26.06.2018 14:45:00', end: '26.06.2018 14:50:00', timeSpend: "00:35:00"},
  {id: 8, title: "Create timer", start: '26.06.2018 17:40:00', end: '26.06.2018 17:45:00', timeSpend: "00:05:00"},
  {id: 9, title: "Create Table", start: '26.06.2018 17:50:10', end: '26.06.2018 17:50:30', timeSpend: "02:10:00"},
  {id: 10, title: "Implement router", start: '26.06.2018 18:30:10', end: '26.06.2018 18:35:50', timeSpend: "02:00:00"},
  {id: 11, title: "Refactor code", start: '26.06.2018 20:20:00', end: '26.06.2018 20:30:30', timeSpend: "01:10:00"},

];

const initialState = {
  ...initialTasks
};

export default function taskReducer(state = initialState, action) {
  if(action.type === "ADD_TASK") {

    // Add task to localStorage
    localStorage.setItem('tasks', JSON.stringify([ ...state, action.payload ]) );

    // Add task to store
    state = Object.values(state);
    //Object.values(state.tasks)
    return [ ...state, action.payload ]
  }

  if(action.type === "GENERATE_TASKS") {
    return action.payload
  }

  if(action.type === "DELETE_TASK") {
    let taskId = action.payload;
    state = Object.values(state);

    let newTaskArray = state.filter(function (task) {
      return taskId !== task.id;
    });

    // Delete task from localStorage
    localStorage.removeItem('tasks');
    localStorage.setItem('tasks', JSON.stringify(newTaskArray));

    return newTaskArray
  }

  return state;
}

