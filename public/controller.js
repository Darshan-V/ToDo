import { renderItems } from './edit.js'
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

export function addDueDate(id) {
    const duedate = document.getElementById(`${id}`).querySelector(`#duedate`)
    const date = document.getElementById(`${id}`).querySelector(`#date`)
    date.innerText = new Date(duedate.value).toLocaleDateString()
    task = fetchtask(id)
    task.duedate = duedate.value
    saveTasks()
}


export function addnotes(id) {
    const notes = document.getElementById(`${id}`).querySelector('#notes')
    task = fetchtask(id)
    task.notes = notes.value
    saveTasks()
}

export function showExtra(id) {
    const innerdetails = document
        .getElementById(`${id}`)
        .querySelector('.innerContentContainer')
    const details = document.getElementById(`${id}`).querySelector('.Details')
    task = fetchtask(id)
    if (!task.show) {
        innerdetails.style = 'display: inline-block'
        details.innerText = '☶'
    } else {
        innerdetails.style = 'display: none'
        details.innerText = '☶'
    }
    task.show = !task.show
    saveTasks()
}


const inputVal = document.querySelector('.inputVal')
export function clearAll() {

    console.log('test')
    localStorage.clear()
    inputVal.value = ''
    doneTasksDiv.style.display = 'none'
    renderItems()
}


function clearDoneTask() {

    renderItems(taskList)
    if (!ifDone) filterTasks()
}
