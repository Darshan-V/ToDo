
let taskList = getTasks()


//get tasks from localstorage
export function getTasks() {
    return JSON.parse(localStorage.getItem('task')) || []
}

//savetasks to localstorage
export function saveTasks() {
    localStorage.setItem('task', JSON.stringify(taskList))
}

export function getTask(id) {
    taskList.filter(t => t.id === id.toString())[0]
}


export function* listGenerator() {
    for (let i = 0; i < taskList.length; i++) {
        yield taskList[i]
    }
}

const inputVal = document.querySelector('.inputVal')//move to edit.js

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





export function deleteItem(id) {
    taskList.splice(index, 1)
    saveTasks()
}




