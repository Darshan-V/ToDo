import { listGenerator } from './src/DB.js'

export function renderItems() {
  const todoListContainer = document.querySelector('.todoList')
  todoListContainer.innerHTML = ''
  for (const task of listGenerator()) {
    const taskElement = document.createElement('div')
    taskElement.setAttribute('class', 'task')
    taskElement.setAttribute('id', task.id)
    taskElement.style.borderLeft = priorityBorder(task.priority)



    const checkbox = document.createElement('input')
    checkbox.setAttribute('class', 'cbx')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.setAttribute('id', task.id)
    if (task.done === true) {
      checkbox.setAttribute('checked', true)
    }
    taskElement.appendChild(checkbox)

    const title = document.createElement('input')
    title.setAttribute('class', 'title')
    title.setAttribute('value', task.title)
    title.setAttribute('id', task.id)
    if (task.done === true) {
      title.style = 'text-decoration: line-through'
    }
    taskElement.appendChild(title)

    const dateSpan = document.createElement('span')
    dateSpan.setAttribute('class', 'date')
    dateSpan.value = task.duedate ? new Date(task.duedate).toLocaleDateString() : ''
    dateSpan.setAttribute('id', task.id)
    title.appendChild(dateSpan)

    const menuButton = document.createElement('button')
    menuButton.setAttribute('class', 'Details')
    menuButton.setAttribute('id', task.id)
    menuButton.innerText = '☶'
    taskElement.append(menuButton)

    const innerContentContainer = document.createElement('div')
    innerContentContainer.setAttribute('class', 'innerContentContainer')
    innerContentContainer.setAttribute('id', task.id)
    taskElement.appendChild(innerContentContainer)

    const innerContent = document.createElement('div')
    innerContent.setAttribute('class', 'innerContent')
    innerContent.setAttribute('id', task.id)
    innerContentContainer.appendChild(innerContent)

    const notesdiv = document.createElement('div')
    notesdiv.setAttribute('class', 'notesdiv')
    notesdiv.setAttribute('id', task.id)

    const notesBox = document.createElement('textarea')
    notesBox.setAttribute('class', 'notes')
    notesBox.setAttribute('type', 'text')
    notesBox.innerText = task.notes
    notesBox.setAttribute('id', task.id)

    notesdiv.appendChild(notesBox)

    innerContent.appendChild(notesdiv)

    // date and priority container
    const datepriority = document.createElement('div')
    datepriority.setAttribute('class', 'datepriority')
    datepriority.setAttribute('id', task.id)

    const dueDate = document.createElement('input')
    dueDate.setAttribute('type', 'date')
    dueDate.setAttribute('class', 'duedate')
    dueDate.setAttribute('id', task.id)
    dueDate.value = task.duedate
    datepriority.appendChild(dueDate)

    const array = ['None', 'Low', 'Medium', 'High']
    const priority = document.createElement('select')
    priority.setAttribute('class', 'priority')
    priority.setAttribute('id', task.id)
    priority.placeholder = 'Write your notes..!'
    priority.value = task.priority
    datepriority.appendChild(priority)

    for (let i = 0; i < array.length; i++) {
      const option = document.createElement('option')
      option.value = array[i]
      option.text = array[i]
      priority.value = task.priority
      priority.appendChild(option)
    }

    datepriority.appendChild(dueDate)
    datepriority.appendChild(priority)

    innerContent.appendChild(datepriority)

    const deleteButton = document.createElement('button')
    deleteButton.setAttribute('id', task.id)
    deleteButton.setAttribute('class', 'deleteTask')
    deleteButton.innerText = 'Delete'
    datepriority.appendChild(deleteButton)
    todoListContainer.appendChild(taskElement)
  }
}
renderItems()
export function priorityBorder(priority) {
  return {
    'None': 'solid white 5px',
    'Low': 'solid blue 5px',
    'Medium': 'solid orange 5px',
    'High': 'solid rgb(210, 0, 50) 5px'
  }[priority]
}



// listner to toggle done tasks

const doneTasksDiv = document.querySelector('.DoneTasksdiv')

const hideDoneTasks = document.querySelector('.doneTasks')
hideDoneTasks.addEventListener('click', function hideDoneTasks() {
  for (const task of listGenerator()) {
    if (task.done === true) {
      const taskItem = document.getElementById(task.id)
      taskItem.style.display = 'none'
    }

  }
})

const showAllTasks = document.querySelector('.showAll')
doneTasksDiv.appendChild(showAllTasks)
showAllTasks.addEventListener('click', function showAllTasks() {
  for (const task of listGenerator()) {
    if (task.done === true) {
      const taskItem = document.getElementById(task.id)
      taskItem.style.display = 'flex'

    }
  }
})