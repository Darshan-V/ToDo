import { renderItems } from './edit.js'
import { getTasks, saveTasks, listGenerator, fetchtask } from './src/DB.js'

const donetask = document.querySelector('.doneTasks')
const doneTasksDiv = document.querySelector('.DoneTasksdiv')

getTasks()

export function checkbox(id) {
    const check = document.getElementById(`${id}`).querySelector('.cbk')
    const title = document.getElementById(`${id}`).querySelector('#pText')
    task = fetchtask(id)
    if (check.checked) {
        title.style = 'text-decoration: line-through'
        task.done = true

        taskList.filter(t => t.done === true)

        if (donetask.value === 'Show Done Tasks') renderItems(taskList.filter(t => t.done === fasle))
        else renderItems(taskList.concat(t => t.done === true))

        doneTasksDiv.style.display = 'flex'
    } else {
        title.style = 'text-decoration: none'
        task.done = false
        taskList.filter(t => t.done === false)
        renderItems(taskList.concat(t => t.done === false))

        if (taskList.forEach(t => t.done) === true) {
            doneTasksDiv.style.display = 'none'
            filterTasks()
            ifDone = !ifDone
        } else doneTasksDiv.style.display = 'flex'
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
    task = fetchtask(id)
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
function clearAll() {
    console.log('test')
    localStorage.clear()
    inputVal.value = ''
    for (let i = 0; i < listGenerator().length; i++) {
        console.log(taskList)
    }
    renderItems()
    doneTasksDiv.style.display = 'none'

}
const clearTasks = document.querySelector('.clearTasks')
clearTasks.addEventListener('click', clearAll())

function clearDoneTask() {

    renderItems(taskList)
    if (!ifDone) filterTasks()
}
