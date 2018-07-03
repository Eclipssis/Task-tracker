export default function deleteTask(id) {
  return {
    type: "DELETE_TASK",
    payload: id
  }
}