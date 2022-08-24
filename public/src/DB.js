
export const taskList = getTasks()

// get tasks from localstorage
export function getTasks() {
  return JSON.parse(localStorage.getItem('task')) || []// naming 'tasks'
}

// savetasks to localstorage
export function saveTasks() {
  localStorage.setItem('task', JSON.stringify(taskList))
}

export function* listGenerator() {
  for (let i = 0; i < taskList.length; i++) {
    yield taskList[i]
  }
}

export function fetchtask(id) {
  return (
    taskList.filter(t => t.id === id.toString())[0])
}
