import { ADD_TASK } from '../actionsTypes'

export default function addTask(task) {
  return {
    type: ADD_TASK,
    payload: task
  }
}