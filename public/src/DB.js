console.log('hello')
let DB = JSON.parse(localStorage.getItem('task'))
export default { DB }



export function getTasks() {
    return JSON.parse(localStorage.getItem('task')) || []
}


export function saveTasks() {
    localStorage.setItem('task', JSON.stringify(taskList))
}

let taskList = getTasks()
console.log(taskList)

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
        saveTasks()

    }


}
export function fetchtask(id) {
    return (
        taskList.find(t => t.id === id.toString())[0]//use find
    )
}

export function updateTitle(id) {
    const title = document.getElementById(`${id}`).querySelector('#pText')
    task = fetchtask(id)
    task.title = title.value
    saveTasks()

}


export function deleteItem(id, index) {
    task = fetchtask(id)
    taskList.splice(index, 1)
    saveTasks()
}




