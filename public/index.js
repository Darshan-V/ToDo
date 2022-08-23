import { saveTasks, getTasks, taskList, listGenerator } from './src/DB.js'
import { renderItems } from './view.js'

const inputVal = document.querySelector('.inputVal')
const donetask = document.querySelector('.doneTasks')
const doneTasksDiv = document.querySelector('.DoneTasksdiv')

inputVal.addEventListener('change', () => {
  addTodo()
  saveTasks()
  // renderItems()

  inputVal.value = ''
})
getTasks()
renderItems()

function addTodo () {
  const item = {
    id: '',
    title: '',
    notes: '',
    duedate: '',
    priority: '',
    done: false,
    show: false
  }
  if (inputVal.value.trim() !== '') {
    item.done = false
    item.id = Date.now().toString()
    item.title = inputVal.value
    taskList.push(item)
    saveTasks()
  }
}
function deleteItem (event, index) {
  const id = event.target.getAttribute('id')
  index = taskList.findIndex(e => e.id === `${id}`)
  console.log(index)
  taskList.splice(index, 1)
  saveTasks()
}
const deleteTask = document.querySelectorAll('.deleteTask')
deleteTask.forEach((deleteEle) => {
  deleteEle.addEventListener('click', deleteItem)
})

getTasks()
function markAsDone (event) {
  const id = event.target.getAttribute('id')
  const check = document.getElementById(`${id}`).querySelector('.cbx')
  const title = document.getElementById(`${id}`).querySelector('.title')
  for (const task of listGenerator()) {
    if (task.id === id) {
      if (check.checked) {
        task.done = true
        title.style = 'text-decoration: line-through'
        saveTasks()
      } else {
        task.done = false
        title.style = 'text-decoration:none'
        saveTasks()
      }
    }
  }
}
// event listner for checkbox
const cbkItems = document.querySelectorAll('.cbx')
cbkItems.forEach((cbx) => {
  cbx.addEventListener('click', markAsDone)
})

function filterTasks () {
  if (taskList.find(t => t.done) === false) {
    donetask.value = '🙉 Show Done Tasks'
    return
  }
  if (ifDone) {
    renderItems(taskList.find(t => t.done === true))
    donetask.value = '🙈 Show All Tasks'
  } else {
    renderItems(taskList)
    donetask.value = '🙉 Show Done Tasks'
  }
  ifDone = !ifDone
}

let ifDone = true
// listner to toggle done tasks
const doneTasks = document.querySelectorAll('.doneTasks')
doneTasks.forEach((dt) => {
  dt.addEventListener('click', filterTasks)
})

function editTitle (event) {
  const id = event.target.getAttribute('id')
  const title = document.getElementById(`${id}`).querySelector('.title')
  for (const task of listGenerator()) {
    if (task.id === id) {
      task.title = title.value
      saveTasks()
    }
  }
}
const updateTitleName = document.querySelectorAll('.title')
updateTitleName.forEach((rename) => {
  rename.addEventListener('change', editTitle)
})

function addPriority (event) {
  const id = event.target.getAttribute('id')
  const priority = document.getElementById(`${id}`).querySelector('.priority')
  for (const task of listGenerator()) {
    if (task.id === id) {
      task.priority = priority.value
      saveTasks()
    }
  }
}

const priorItem = document.querySelectorAll('.priority')
priorItem.forEach((stat) => {
  stat.addEventListener('change', addPriority)
})

function addDueDate (event) {
  const id = event.target.getAttribute('id')
  const duedate = document.getElementById(`${id}`).querySelector('.duedate')
  const date = document.getElementById(`${id}`).querySelector('.date')
  date.innerText = new Date(duedate.value).toLocaleDateString()
  for (const task of listGenerator()) {
    if (task.id === id) {
      task.duedate = duedate.value
      saveTasks()
    }
  }
}
const dueDate = document.querySelectorAll('.duedate')
dueDate.forEach((dDaue) => {
  dDaue.addEventListener('change', addDueDate)
})

function addnotes (event) {
  const id = event.target.getAttribute('id')
  const notes = document.getElementById(`${id}`).querySelector('.notes')
  for (const task of listGenerator()) {
    if (task.id === id) {
      task.notes = notes.value
      saveTasks()
    }
  }
}

const description = document.querySelectorAll('.notes')
description.forEach((tDesc) => {
  tDesc.addEventListener('change', addnotes)
})

function showMoreDetails (event) {
  const id = event.target.getAttribute('id')
  const innerdetails = document
    .getElementById(`${id}`)
    .querySelectorAll('.innerContent')
  const details = document.getElementById(`${id}`).querySelector('.Details')
  for (const task of listGenerator()) {
    if (task.id === id) {
      if (!task.show) {
        innerdetails.forEach((inner) => {
          inner.style = 'display:inline-block'
        })
        details.innerText = '☶'
      } else {
        innerdetails.forEach((inner) => {
          inner.style = 'display:none'
        })
        details.innerText = '☶'
      }
      task.show = !task.show
      saveTasks()
    }
  }
}
const dropbutton = document.querySelectorAll('.Details')
dropbutton.forEach((button) => {
  button.addEventListener('click', showMoreDetails)
})

function clearAll () {
  localStorage.clear()
  inputVal.value = ''
  doneTasksDiv.style.display = 'none'
  renderItems()
}
const clearAllTasks = document.querySelector('.clearTasks')
clearAllTasks.addEventListener('click', clearAll)

function clearDoneTasks () {
  taskList.splice(taskList.findIndex(item => item.done === 'true'), 1)
  saveTasks()
  filterTasks()
}
const clearDoneItems = document.querySelector('.clearDoneTasks')
clearDoneItems.addEventListener('click', clearDoneTasks)
