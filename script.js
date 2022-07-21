const todoForm = document.querySelector('.todo-form')
const todoInput = document.querySelector('.todo-input')
const todoItemsList = document.querySelector('.todo-items')
let todos = []
const priorities = ['High', 'Medium', 'Low', 'None']

todoForm.addEventListener('submit', function (event) {
  event.preventDefault()
  addTodo(todoInput.value)
})

// function to add todo
function addTodo(item) {
  // if item is not empty
  if (item === '') {
    return
  }
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

function renderTodos(todos, notes) {
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


    const listIndex = document.querySelector('li')
    const listContainer = document.createElement('div')
    listContainer.setAttribute('class', 'listContainer')
    listContainer.setAttribute('data-key', item.id)

    listContainer.innerHTML = `<label for="due-date"></label>
    <input type="date" id="Duedate" name="Duedate"/>
    
    <select class = 'priorities' name="Priority">
    <option value="none">None</opiton>
    <option value="medium">Medium</option>
    <option value ="high">High</option>
    </select>
    <form>
    <textarea type='text' class= "note">${notes}</textarea>
    </form>`
    li.append(listContainer)
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
}

function deleteTodo(id) {
  todos = todos.filter(function (item) {
    return item.id != id
  })
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

// function showDiv() {
//   for (let i = 0; i < todos.length; i++) {
//     document.querySelectorAll('.listContainer')[i].style.display = 'block'
//   }
// }

// function hideDiv() {

//   for (let i = 0; i < todos.length; i++) {
//     document.querySelectorAll('.listContainer')[i].style.display = 'none'
//   }
// }
