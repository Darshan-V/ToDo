import DB from './src/DB.js'
import { addTodo, fetchtask, updateTitle, deleteItem, getTasks, saveTasks, listGenerator } from './src/DB.js'

const inputVal = document.querySelector('.inputVal')
const donetask = document.querySelector('.doneTasks')
const doneTasksDiv = document.querySelector('.DoneTasksdiv')


inputVal.addEventListener('change', (event) => {
    // if (event.key === 'Enter') {
    addTodo()
    // }
    renderItems()


    inputVal.value = ''
})

function renderItems() {
    let html = ''
    const itemShow = document.querySelector('.todoLists')
    for (let data of listGenerator()) {
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
          <button class='deleteTask' onClick='deleteItem(${data.id})'>Delete</button>
        </div>
      </div>
      </div>
    </div>
    `
    }
    itemShow.innerHTML = html
}
renderItems()

function checkboxHTML(task) {
    return `<input type='checkbox' class = 'cbx' id = 'checkbox' ${task.done ? 'checked' : ''}/>`

}

function titleHTML(task) {
    return `<input class = 'title' type = 'text' id = 'pText' value = '${task.title}' style = 'text-decoration: ${task.done ? 'line-through' : 'none'}' />`
}

function taskComponents(task) {
    return `<div id='details' class='Details') >☶</div>`
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

// if (taskList.filter(t => t.done === true) === 0) doneTasksDiv.style.display = 'none'
// else doneTasksDiv.style.display = 'flex'
