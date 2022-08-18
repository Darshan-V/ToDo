import { clearAll, showExtra } from "./controller.js";
import { deleteItem, listGenerator } from "./src/DB.js";
import { updateCheck, addDueDate } from "./controller.js";
export function renderItem() {
  const itemShow = document.querySelector('.todoLists')
  for (let task of listGenerator()) {
    const taskele = document.createElement('div')
    taskele.setAttribute('class', 'task')
    taskele.setAttribute('id', task.id)
    //checkbox element
    const checkbox = document.createElement('input')
    checkbox.setAttribute('id', 'checkbox')
    checkbox.setAttribute('class', 'cbx')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.setAttribute('data-id', task.id)
    if (task.done) {
      checkbox.setAttribute('checked', true)
    }
    taskele.appendChild(checkbox)

    //title
    const title = document.createElement('input')
    title.setAttribute('id', 'pText')
    title.setAttribute('class', 'title')
    title.setAttribute('value', task.title)
    title.setAttribute('data-id', task.id)
    taskele.appendChild(title)

    //date span element
    const dateSpan = document.createElement('span')
    dateSpan.setAttribute('class', 'date')
    dateSpan.value = task.duedate ? new Date(task.duedate).toLocaleDateString() : ''
    dateSpan.setAttribute('data-id', task.id)
    title.appendChild(dateSpan)

    //menu
    const menuButton = document.createElement('span')
    menuButton.setAttribute('class', 'Details')
    menuButton.setAttribute('id', 'details')
    menuButton.setAttribute('data-id', task.id)
    menuButton.setAttribute('value', '☶')
    title.append(menuButton)

    //innerContainer
    const innerContentContainer = document.createElement('div')
    innerContentContainer.setAttribute('class', '.innerContentContainer')
    innerContentContainer.setAttribute('style', 'displsy:inline-block')
    innerContentContainer.setAttribute('data-id', task.id)
    taskele.appendChild(innerContentContainer)

    //inner content
    const innerContent = document.createElement('div')
    innerContent.setAttribute('class', 'innerContent')
    innerContent.setAttribute('data-id', task.id)
    innerContentContainer.appendChild(innerContent)

    //notes container
    const notesdiv = document.createElement('div')
    notesdiv.setAttribute('class', 'notesdiv')
    notesdiv.setAttribute('data-id', task.id)

    //notes text area
    const notesele = document.createElement('textarea')
    notesele.setAttribute('class', 'notes')
    notesele.setAttribute('type', 'text')
    notesele.setAttribute('id', 'notes')
    notesele.setAttribute('value', task.notes)
    notesele.setAttribute('data-id', task.id)

    notesdiv.appendChild(notesele)


    innerContent.appendChild(notesdiv)

    //date and priority container
    const datepriority = document.createElement('div')
    datepriority.setAttribute('class', 'datepriority')
    datepriority.setAttribute('data-id', task.id)

    //date element
    const dateBreak = document.createElement('input')

    dateBreak.setAttribute('type', 'date')
    dateBreak.setAttribute('class', 'duedate')
    dateBreak.setAttribute('id', 'duedate')
    dateBreak.setAttribute('data-id', task.id)
    datepriority.appendChild(dateBreak)


    //priority element
    const array = ['None', 'Low', 'Medium', 'High'];
    //Create and append select list
    const prioritybreak = document.createElement('select')
    prioritybreak.id = "mySelect";
    datepriority.appendChild(prioritybreak);

    for (let i = 0; i < array.length; i++) {
      let option = document.createElement("option");
      option.value = array[i];
      option.text = array[i];
      prioritybreak.appendChild(option);
    }

    datepriority.appendChild(dateBreak)
    datepriority.appendChild(prioritybreak)

    taskele.appendChild(datepriority)

    //delete button
    const deleteButton = document.createElement('button')
    deleteButton.setAttribute('class', 'deleteTask')
    deleteButton.innerText = 'Delete'
    deleteButton.addEventListener('click', clearAll)
    datepriority.appendChild(deleteButton)
    itemShow.appendChild(taskele)
  }
}






