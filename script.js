// const { format } = require("path")

const todoForm = document.querySelector('.todo-form')
const todoInput = document.querySelector('.todo-input')
const todoItemsList = document.querySelector('.todo-items')
let todos = []
let priorities = ['High', 'Medium', 'Low', 'None']

todoForm.addEventListener('submit', function (event) {
  event.preventDefault()
  addTodo(todoInput.value)
})


// function to add todo
function addTodo(item) {
  // if item is not empty
  if (item !== '') {
    const todo = {
      id: Date.now(),
      name: item,
      completed: false
    }
    // then add it to todos array
    todos.push(todo)
    addToLocalStorage(todos)
    todoInput.value = ''
  }
}


function renderTodos(todos) {
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
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">X</button>
    `
    todoItemsList.append(li)
  })
}


// function to add todos to local storage
function addToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos))
  renderTodos(todos)
}


function getFromLocalStorage() {
  const reference = localStorage.getItem('todos')
  if (reference) {
    todos = JSON.parse(reference)
    renderTodos(todos)
  }
}


function toggle(id) {
  todos.forEach(function (item) {
    if (item.id == id) {
      item.completed = !item.completed
    }
  })
  addToLocalStorage(todos)
}


function deleteTodo(id) {
  todos = todos.filter(function (item) {
    return item.id != id
  })
  // update the localStorage
  addToLocalStorage(todos)
}

getFromLocalStorage()
todoItemsList.addEventListener('click', function (event) {
  // check if the event is on checkbox
  if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.getAttribute('data-key'))
  }
  if (event.target.classList.contains('delete-button')) {
    deleteTodo(event.target.parentElement.getAttribute('data-key'))
  }
})


function addAcc() {
  const li = document.querySelector('.item')

  const container = document.createElement('div')
  container.classList.add('.divContainer')
  const accBtn = document.createElement('button')
  accBtn.classList.add('.add-button')

  const notes = document.createElement('textarea')
  notes.classList.add('.list-note')

  container.append(notes)
  li.append(accBtn)
  li.append(container)
}
// li.addEventListener('onclick', () => {

// })
addAcc()

for (let i = 0; i < todos.length; i++) {
  todos[i].append(addAcc())
}