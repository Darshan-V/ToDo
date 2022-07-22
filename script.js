
const todoForm = document.querySelector('.todo-form')
const todoInput = document.querySelector('.todo-input')
const todoItemsList = document.querySelector('.todo-items')
let todos = []
let notes = []

// const priorities = ['High', 'Medium', 'Low', 'None']

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
    note: "",
    id: Date.now(),
    name: item,
    completed: false
  }
  // then add it to todos array
  todos.push(todo)
  addToLocalStorage(todos)
  todoInput.value = ''
}

function renderTodos(todos) {
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
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class='show' onclick = 'showDiv()'>▼</button>

    `
    todoItemsList.append(li)

    const listContainer = document.createElement('div')
    listContainer.setAttribute('class', 'listContainer')
    listContainer.setAttribute('data-key', item.id)

    listContainer.innerHTML = `<label for="due-date"></label>
    <input type="date" id="Duedate" name="Duedate"/>
    <form>
    <textarea type='text' class= "note">${item.note}</textarea>
    </form>
    <select class = 'priorities' name="Priority">
    <option value="none">None</opiton>
    <option value="greem">Medium</option>
    <option value ="red">High</option>
    </select>
    <button class="delete-button">Delete</button>
    `
    li.appendChild(listContainer)
    listContainer.style.display = 'none'
  })
}


// function to add todos to local storage
function addToLocalStorage(todos, notes) {
  localStorage.setItem('todos', JSON.stringify(todos))
  // localStorage.setItem('notes', JSON.stringify(notes))
  renderTodos(todos)

  // localStorage.setItem('notes', JSON.stringify(notes))
  // renderNotes(notes)
}

function getFromLocalStorage() {
  const reference = localStorage.getItem('todos')
  if (reference) {
    todos = JSON.parse(reference)
    renderTodos(todos)
  }
  // const noteReference = localStorage.getItem('notes')
  // if (noteReference) {
  // notes = JSON.parse(noteReference)
  // renderNotes(notes)
  // }
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

// todoItemsList.addEventListener('change', function (event) {
//   if (event.target.classList.contains('note')) {
//     addToLocalStorage(notes)
//   }
// })

function showDiv() {
  const x = document.querySelector('.listContainer')
  if (x.style.display === 'none') {
    x.style.display = 'block'
  } else {
    x.style.display = 'none'
  }
}

const noteData = document.querySelector('.note')
console.log(noteData)

function updateNote(text) {
  if (text = '') {
    return
  }
  const note = {
    note: text
  }
  notes.push(note)
  addToLocalStorage(notes)
  noteData = ''
}

// noteData.addEventListener('change', function (event) {
//   updateNote(todoInput.value)
// })

// function renderNotes(notes) {

//   notes.forEach(function (item) {


//     const listContainer = document.createElement('div')
//     listContainer.setAttribute('class', 'listContainer')
//     listContainer.setAttribute('data-key', item.id)
//     listContainer.innerHTML = `<label for="due-date"></label>
//   <input type="date" id="Duedate" name="Duedate"/>
//   <form>
//   <textarea type='text' class= "note">${notes}</textarea>
//   </form>
//   <select class = 'priorities' name="Priority">
//   <option value="none">None</opiton>
//   <option value="greem">Medium</option>
//   <option value ="red">High</option>
//   </select>
//   <button class="delete-button">Delete</button>
//   `
//     li.appendChild(listContainer)
//     listContainer.style.display = 'none'
//   })
// }