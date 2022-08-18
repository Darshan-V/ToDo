import { renderItems } from './edit.js'
import { getTasks, saveTasks, getTask } from './src/DB.js'

const donetask = document.querySelector('.doneTasks')
const doneTasksDiv = document.querySelector('.DoneTasksdiv')


let taskList = getTasks()

const cbk = document.querySelector('.cbx')
cbk.addEventListener('click', updateCheck)
export function updateCheck(event) {
    // const check = document.getElementById(`${id}`).querySelector('.cbk')
    // const title = document.getElementById(`${id}`).querySelector('#pText')id

    const dataID = event.target.getAttribute('data-id')
    console.log(dataID)

    if (dataID.checked) {
        // title.style = 'text-decoration: line-through'
        event.done = true
        saveTasks()

    } else {
        event.done = false
        saveTasks()
    }
}

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




export function addPriority(id) {
    const priority = document.getElementById(`${id}`).querySelector('#priority')
    task = getTask(id)
    task.priority = priority.value
    priority.children[priority.value].selected = true
    saveTasks()
}

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
