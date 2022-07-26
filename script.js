const todos = []
const priorities = ['None', 'Low', 'Medium', 'High']

function todoTitle(todo) {
  const titleContainer = document.createElement('div')
  titleContainer.setAttribute('class', 'todo-container')

  const todoTitle = document.createElement('span')
  todoTitle.setAttribute('class', 'list-title')

  const listCheckbox = document.createElement('input')
  listCheckbox.setAttribute('class', 'todo-checkbox')
  listCheckbox.setAttribute('type', 'checkbox')
  listCheckbox.setAttribute('checked', 'true')

  const todoInput = document.createElement('input')
  todoInput.setAttribute('class', 'todo-input')
  todoInput.setAttribute('value', `${todo.title}`)

  todoTitle.appendChild(listCheckbox)
  todoTitle.appendChild(todoInput)

  const headSpan = document.createElement('span')
  const headExpander = document.createElement('button')
  headExpander.setAttribute('class', 'todo-expander')
  headExpander.setAttribute('value', '+')
  headExpander.appendChild(headSpan)

  titleContainer.appendChild(todoTitle)
  titleContainer.appendChild(headSpan)

}

function todoBody(todo) {


}

function createTodo(todo) { }

function addTodo(event) { }

function toggleTodo(event) { }

function deleteTodo(event) { }

function renderTodos(todos) { }

function editTods(event) { }

function showHidden(event) { }

function setDate(event) { }

function setPriority(event) { }

function setNotes(event) { }

function addAndRemoveFromLocalStorage() { }

function clearAll() { }

function toggleClearAll() { }

function toggleDone() { }

function clearDone() { }

