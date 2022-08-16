console.log('hello')
export let taskList = []
localStorage.setItem('task', JSON.stringify(taskList))
let DB = JSON.parse(localStorage.getItem('task'))
export default { DB }


export function getTasks() {
    return JSON.parse(localStorage.getItem('task')) || []
}

const inputVal = document.querySelector('.inputVal')
export function addTodo() {
    const item = {
        id: '',
        title: '',
        notes: '',
        duedate: '',
        priority: '',
        done: false,
        show: false
    }
    if (inputVal.value.trim() !== '') {
        item.done = false
        item.id = Date.now().toString()
        item.title = inputVal.value
        taskList.push(item)
        localStorage.setItem('task', JSON.stringify(taskList))
    }

}
export function fetchtask(id) {
    return (
        taskList.filter(t => t.id === id.toString())[0]
    )
}

export function updateTitle(id) {
    const title = document.getElementById(`${id}`).querySelector('#pText')
    task = fetchtask(id)
    task.title = title.value
    localStorage.setItem('task', JSON.stringify(taskList))
}


export function deleteItem(id, index) {
    task = fetchtask(id)
    taskList.splice(index, 1)
    localStorage.setItem('task', JSON.stringify(taskList))
    renderItems(taskList)
}

export function clearAll() {
    localStorage.clear()
    inputVal.value = ''
    taskList = []
    renderItems(taskList)
    doneTasksDiv.style.display = 'none'
}

export function clearDoneTask() {

    localStorage.setItem('task', JSON.stringify(taskList))
    renderItems(taskList)
    if (!ifDone) filterTasks()
}

