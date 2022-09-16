
// get tasks from localstorage


const mainUrl = 'http://localhost:8000/todo'
let jsondata
let apiUrl = "http://localhost:8000/todos"

export async function getTasks(url) {
  let response = await fetch(url)
  let data = await response.json()
  return data
}


jsondata = await getTasks(apiUrl)
export const taskList = jsondata



export function* listGenerator() {
  for (let i = 0; i < taskList.length; i++) {
    yield taskList[i]
  }
}

export async function fetchTask(id) {
  return (await fetch(`${mainUrl}/${id}`))
}

export async function addTask(item) {
  item.id = Date.now().toString()
  taskList.push(item)
  return await fetch('http://localhost:8000/todo', {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'content-type': 'application/json'
    }
  })
}

export async function deleteTask(id, index) {
  index = taskList.findIndex(e => e.id === id)
  taskList.splice(index, 1)
  return await fetch(`${mainUrl}/${id}`, { method: 'DELETE' })

}

export async function setPriority(id, priority) {
  console.log(priority)
  return await fetch(`${mainUrl}/${id}/priority`, {
    method: 'PUT',
    body: JSON.stringify({ priority: `${priority}` }),
    headers: { 'content-type': 'application/json' }
  })

}



export async function setDueDate(id, duedate) {
  console.log(duedate)
  return await fetch(`${mainUrl}/${id}/duedate`, {
    method: 'PUT',
    body: JSON.stringify({ duedate: `${duedate}` }),
    headers: { 'content-type': 'application/json' }
  })
}

export async function setNotes(notes, id) {

  return await fetch(`${mainUrl}/${id}/notes`, {
    method: 'PUT',
    body: JSON.stringify({ notes: `${notes}` }),
    headers: { 'content-type': 'application/json' }
  })
}

export async function clearDoneTasks() {
  for (let i = taskList.length - 1; i >= 0; --i) {
    if (taskList[i].done === true) {
      taskList.splice(i, 1);
    }
  }
  return await fetch(`${mainUrl}/deletedone`, { method: 'DELETE' })
}

export async function clearAll() {
  taskList.length = 0
  return await fetch(`${apiUrl}`, { method: 'DELETE' })
}

export async function updateTitle(id, title) {
  return await fetch(`${mainUrl}/${id}/title`, {
    method: 'PUT',
    body: JSON.stringify({ title: `${title}` }),
    headers: { 'content-type': 'application/json' }
  })
}

export async function updateDoneStatus(status, id) {
  console.log(status)
  return await fetch(`${apiUrl}/${id}/completed`, {
    method: 'PUT',
    body: JSON.stringify({ done: `${status}` }),
    headers: { 'content-type': 'application/json' }
  })
}
