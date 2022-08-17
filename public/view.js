import { listGenerator } from "./src/DB.js";
export function renderItem() {
    for (let data of listGenerator()) {
        `<div id = '${data.id}' class='task'>    
      ${checkboxHTML(data)}
      ${titleHTML(data)}
       <span id = 'date' class = 'date'>${data.duedate ? new Date(data.duedate).toLocaleDateString() : ''} </span>
      ${taskComponents(data)}
      <div style='display: none' class='innerContentContainer'>
      <div class = 'innerContent'>
        <div class = 'notesdiv'>
          Notes
          <br/>
          ${NotesHTML(data)}
        </div>
        <div class = 'datepriority'>
          Due Date
          <br />
          ${duedateHTML(data)}
          <br/><br/>
          Priority
          <br />
          ${priorityHTML(data)}
          <br /> <br /> <br />
          <button class='deleteTask' onClick='deleteItem(${data.id})'>Delete</button>
        </div>
      </div>
      </div>
    </div>`
    }
}

