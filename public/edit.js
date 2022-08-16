import DB from './src/DB.js'
import { addTodo, getTasks, taskList, fetchtask, updateTitle, deleteItem, clearAll, clearDoneTask } from './src/DB.js'

let taskList = []
const inputVal = document.querySelector('.inputVal')
const donetask = document.querySelector('.doneTasks')
const doneTasksDiv = document.querySelector('.DoneTasksdiv')

inputVal.addEventListener('keyup', (event) => {
    event.preventDefault()
    if (event.key === 'Enter') {
        addTodo()
        renderItems(taskList)
        inputVal.value = ''
    }

})


function renderItems(taskList) {
    getTasks()
    let html = ''
    const itemShow = document.querySelector('.todoLists')
    taskList.forEach((data, index) => {
        html += `
    <div id = '${data.id}' class='task'>
      ${checkboxHTML(data)}
      ${titleHTML(data)}
       <span id = 'date' class = 'date'>${data.duedate ? new Date(data.duedate).toLocaleDateString() : ''} </span>
      ${taskComponents(data)}
      <div style='display: none' class='innerContentContainer'>
      <div class = 'innerContent'>
        <div class = 'notesdiv'>
          Notes
          <br/>
          ${NotesHTML(data)}
        </div>
        <div class = 'datepriority'>
          Due Date
          <br />
          ${duedateHTML(data)}
          <br/><br/>
          Priority
          <br />
          ${priorityHTML(data)}
          <br /> <br /> <br />
          <button class='deleteTask' onClick='deleteItem(${data.id}, ${index})'>Delete</button>
        </div>
      </div>
      </div>
    </div>
    `
    })
    itemShow.innerHTML = html
}
renderItems(taskList)

function checkboxHTML(task) {
    return `<input type='checkbox' id = 'checkbox' onChange = checkbox(${task.id}) ${task.done ? 'checked' : ''}/>`

}

function titleHTML(task) {
    return `<input class = 'title' type = 'text' id = 'pText' value = '${task.title}' style = 'text-decoration: ${task.done ? 'line-through' : 'none'}' onChange = updateTitle(${task.id}) />`
}

function taskComponents(task) {
    return `<div id='details' class='Details' onClick = showExtra(${task.id}) >☶</div>`
}

function NotesHTML(task) {
    if (task.notes) {
        return `<textarea type='text' id='notes' class = 'notes' onChange = addnotes(${task.id}) > ${task.notes} </textarea>`
    }
    return `<textarea type='text' id='notes' class = 'notes' onChange = addnotes(${task.id}) > </textarea>`
}

function duedateHTML(task) {
    if (task.duedate) {
        return `<input type='date' id='duedate' class = 'duedate' onChange = addDueDate(${task.id}) value = '${task.duedate}'/>`
    }
    return `<input type='date' id='duedate' class = 'duedate' onChange = addDueDate(${task.id}) />`

}

function priorityHTML(task) {

    return `<select id='priority' class = 'priority' onChange = addPriority(${task.id})>
  <option value=0 ${task.priority === '0' ? 'selected' : ''}>None</option>
  <option value=1 ${task.priority === '1' ? 'selected' : ''}>Low</option>
  <option value=2 ${task.priority === '2' ? 'selected' : ''}>Medium</option>
  <option value=3 ${task.priority === '3' ? 'selected' : ''}>High</option>
  </select>`
}

function checkbox(id) {
    const check = document.getElementById(`${id}`).querySelector('#checkbox')
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
    localStorage.setItem('task', JSON.stringify(taskList))
}

if (taskList.filter(t => t.done === true) === 0) doneTasksDiv.style.display = 'none'
else doneTasksDiv.style.display = 'flex'

let ifDone = true

function filterTasks() {
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

function addPriority(id) {
    const priority = document.getElementById(`${id}`).querySelector('#priority')
    task = fetchtask(id)
    task.priority = priority.value
    priority.children[priority.value].selected = true
    localStorage.setItem('task', JSON.stringify(taskList))
}

function addDueDate(id) {
    const duedate = document.getElementById(`${id}`).querySelector(`#duedate`)
    const date = document.getElementById(`${id}`).querySelector(`#date`)
    date.innerText = new Date(duedate.value).toLocaleDateString()
    task = fetchtask(id)
    task.duedate = duedate.value
    localStorage.setItem('task', JSON.stringify(taskList))
}


function addnotes(id) {
    const notes = document.getElementById(`${id}`).querySelector('#notes')
    task = fetchtask(id)
    task.notes = notes.value
    localStorage.setItem('task', JSON.stringify(taskList))
}

function showExtra(id) {
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
    localStorage.setItem('task', JSON.stringify(taskList))
}