import { renderItems } from './index.js'
import { getTasks, saveTasks, getTask, listGenerator } from './src/DB.js'

const donetask = document.querySelector('.doneTasks')
const doneTasksDiv = document.querySelector('.DoneTasksdiv')


let taskList = getTasks()


export function updateCheck(event) {
    const id = event.target.getAttribute('id')
    const check = document.getElementById(`${id}`).querySelector('.cbx')
    const title = document.getElementById(`${id}`).querySelector('.title')
    for (const task of listGenerator()) {
        if (task.id === id) {
            if (check.checked) {
                task.done = true
                title.style = 'text-decoration: line-through'
                saveTasks()
            }
            else {
                task.done = false
                title.style = 'text-decoration:none'
                saveTasks()
            }
        }
    }
}
//event listner for checkbox
const cbkItems = document.querySelectorAll('.cbx')
cbkItems.forEach((cbx) => {
    cbx.addEventListener('click', updateCheck)
})


export function filterTasks() {
    if (taskList.filter(t => t.done) === false) {
        donetask.value = '🙉 Show Done Tasks'
        return
    }
    if (ifDone) {
        renderItems(taskList.filter(t => t.done === true))
        donetask.value = '🙈 Show All Tasks'
    } else {
        renderItems(taskList)
        donetask.value = '🙉 Show Done Tasks'
    }
    ifDone = !ifDone
}

let ifDone = true
//listner to toggle done tasks
const doneTasks = document.querySelectorAll('.doneTasks')
doneTasks.forEach((dt) => {
    dt.addEventListener('click', filterTasks)
})



export function addPriority(event) {
    let id = event.target.getAttribute('id')
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

export function addDueDate(event) {
    let id = event.target.getAttribute('id')
    const duedate = document.getElementById(`${id}`).querySelector(`.duedate`)
    const date = document.getElementById(`${id}`).querySelector(`.date`)
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


export function addnotes(event) {
    let id = event.target.getAttribute('id')
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

export function showExtra(event) {
    let id = event.target.getAttribute('id')
    const innerdetails = document
        .getElementById(`${id}`)
        .querySelectorAll('.innerContentContainer')
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
    button.addEventListener('click', showExtra)
})


const inputVal = document.querySelector('.inputVal')
export function clearAll() {

    localStorage.clear()
    inputVal.value = ''
    doneTasksDiv.style.display = 'none'
    renderItems()
}
const clearAllTasks = document.querySelector('.clearTasks')
clearAllTasks.addEventListener('click', clearAll)


function clearDoneTask() {

    renderItems(taskList)
    if (!ifDone) filterTasks()
}
