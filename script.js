
const todoForm = document.querySelector('.todo-form')
const todoInput = document.querySelector('.todo-input')
const todoItemsList = document.querySelector('.todo-items')
let todos = []

const priorities = { none: 0, low: 1, medium: 2, high: 3 }

todoForm.addEventListener('submit', function (event) {
  event.preventDefault()
  addTodo(todoInput.value)
})



function addTodo(item) {
  if (item === '') {
    return
  }
  const todo = {
    noteName: '',
    id: Date.now(),
    name: item,
    completed: false,
    priority: priorities.none,
    dueDate: ''
  }
  todos.push(todo)
  addToLocalStorage(todos)
  todoInput.value = ''
}


function renderMain(todos) {
  // console.log(todos)
  todoItemsList.innerHTML = ''
  todos.forEach(function (item) {
    const checked = item.completed ? 'checked' : null
    const li = document.createElement('li')
    li.setAttribute('class', 'item')
    li.setAttribute('data-key', item.id)

    if (item.completed === true) {
      li.classList.add('checked')
    }
    li.innerHTML = `
      <input type = 'checkbox' class = 'checkbox' ${checked}>
      
      <button class = 'show' onclick = 'showDiv()'>▼</button>

    `
    const listDiv = document.createElement('div')
    listDiv.innerText = `${item.name}`
    li.append(listDiv)

    todoItemsList.append(li)
  })
}

function renderHidden() {

  todos.forEach(function (item) {

    const li = document.querySelector('li')
    const listContainer = document.createElement('div')
    listContainer.setAttribute('class', 'listContainer')
    listContainer.setAttribute('data-key', item.id)

    listContainer.innerHTML = `
    <input type = 'date' id = 'Duedate' name = 'Duedate'/>

    <div class= 'notes-content'>
    <form class = 'note-form'>
      <textarea class= 'list-item__textarea'>${item.noteName}</textarea>
      </form>
    </div>
    
    <select class = 'priorities' name= 'Priority'>
      <option value = 'none'>None</opiton>
      <option value = 'low'>Low</option>
      <option value = 'medium'>Medium</option>
      <option value = 'high'>High</option>
    </select>
    
    <button class ='delete-button'>Delete</button>
    `
    li.appendChild(listContainer)
    listContainer.style.display = 'none'
  })
}

// function to add todos to local storage
function addToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos))
  renderMain(todos)
  renderHidden(todos)
}

function getFromLocalStorage() {
  const reference = localStorage.getItem('todos')
  if (reference) {
    todos = JSON.parse(reference)
    renderMain(todos)
    renderHidden(todos)
  }
}

function showDiv() {
  const x = document.querySelector('.listContainer')

  if (x.style.display === 'none') {
    x.style.display = 'block'
  } else {
    x.style.display = 'none'
  }
}


function toggle(id) {
  todos.forEach(function (item) {
    if (item.id == id) {
      item.completed = !item.completed
    }
  })
}

function deleteTodo(id) {
  todos = todos.filter(function (item) {
    return item.id != id
  })
}

function setDate() {

}

getFromLocalStorage()
todoItemsList.addEventListener('click', function (event) {
  // check if the event is on checkbox
  if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.getAttribute('data-key'))
    addToLocalStorage(todos)
  }
  if (event.target.classList.contains('delete-button')) {
    deleteTodo(event.target.parentElement.getAttribute('data-key'))
    addToLocalStorage(todos)
  }
})