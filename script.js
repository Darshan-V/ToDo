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

      <div class="listContainer">
      <input type='text'${notes}/>
      <select class = 'priorities' name="Priority">
      <option value="none">None</opiton>
      <option value="medium">Medium</option>
      <option value ="high">High</option>
      </select>
      <form>
      <label for="due-date">Duedate:</label>
      <input type="date" id="Duedate" name="Duedate"/>
      <input type="submit"/>
      </form>
    </div>
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

}

function deleteTodo(id) {
  todos = todos.filter(function (item) {
    return item.id != id
  })
  // update the localStorage

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

// function addToNote(text) {

//   const noteBlock = document.createElement('textarea')
//   noteBlock.setAttribute('class', 'noteBox')
//   const sContainerBtn = document.createElement('button')
//   sContainerBtn.setAttribute('class', 'toggle-btn')
//   sContainerBtn.textContent = '+'
//   if (text !== '') {
//     const note = {
//       note: text
//     }
//     todos.push(note)
//     addToLocalStorage(todos)
//   }
// }

// const listContainer = document.createElement('div')
// listContainer.setAttribute('class', 'liContainer')
// const mainContainer = document.querySelector('.container')
// listContainer.appendChild(mainContainer)

// const listToggle = document.querySelector('li')
// listToggle.appendChild('sContainerBtn')
// listToggle.addEventListener('click', () => {
//   const li = document.querySelector('li')
//   li.append(listContainer)
// })
