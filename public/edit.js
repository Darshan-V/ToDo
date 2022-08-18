import { getTasks, saveTasks } from './src/DB.js'
import { addTodo } from './src/DB.js'
import { renderItem } from './view.js'

const inputVal = document.querySelector('.inputVal')


getTasks()
inputVal.addEventListener('change', () => {
  addTodo()
  renderItems()
  saveTasks()

  inputVal.value = ''
})
export function renderItems() {
  renderItem()
}
renderItems()




