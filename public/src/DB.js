
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

export function addTask(item) {
  item.done = false
  item.id = Date.now().toString()
  taskList.push(item)
  saveTasks()
}

export function deleteTask(id, index) {
  index = taskList.findIndex(e => e.id === id)
  taskList.splice(index, 1)
  saveTasks()
}

export function setPriority(priority, id) {
  for (const task of listGenerator()) {
    if (task.id === id) {
      task.priority = priority.value
      saveTasks()
    }
  }
}

export function setDueDate(id, duedate) {
  for (const task of listGenerator()) {
    if (task.id === id) {
      task.duedate = duedate.value
      saveTasks()
    }
  }
}

export function setNotes(notes, id) {
  for (const task of listGenerator()) {
    if (task.id === id) {
      task.notes = notes.value
      saveTasks()
    }
  }
}

export function clearDoneTasks() {
  for (let i = taskList.length - 1; i >= 0; --i) {
    if (taskList[i].done === true) {
      taskList.splice(i, 1)
    }
  }
  saveTasks()
}

export function clearAll() {
  taskList.length = 0
  saveTasks()
}
