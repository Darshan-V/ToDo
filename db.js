import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
    user: 'postgres',
    password: 'lol',
    database: 'todo_database',
    host: 'localhost',
    port: 5432
})
export default pool
const taskList = getTasks()

// get tasks from localstorage
export async function getTasks() {
    return (await pool.query('SELECT * FROM todo'))// naming 'tasks'
}

function* listGenerator() {
    for (let i = 0; i < taskList.length; i++) {
        yield taskList[i]
    }
}

export async function fetchtask(id) {
    return (
        await pool.query('SELECT * from todo WHERE id = $1', [id]))
}

export async function addTask(id, title, notes, duedate, priority, done, show) {

    const todo = await pool.query('INSERT into todo (id,title,notes,duedate,priority,done,show) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',
        [id, title, notes, duedate, priority, done, show])
    return todo.rows[0].id
}

export async function deleteTask(id) {

    return (await pool.query('DELETE from todo WHERE id=$1', [id]))
}

export async function editTitle(title, id) {

    return (await pool.query('UPDATE todo SET title = $1  WHERE id = $2',
        [title, id]))
}

export async function setPriority(priority, id) {
    return (await pool.query('UPDATE todo SET priority = $1 WHERE id = $2', [priority, id]))
}

export async function setDueDate(duedate, id) {

    return (await pool.query('UPDATE todo SET duedate = $1 WHERE id = $2', [duedate, id]))
}

export async function setNotes(notes, id) {

    return (await pool.query('UPDATE todo SET notes = $1 WHERE id = $2', [notes, id]))
}

export async function clearDoneTasks() {

    return (await pool.query('DELETE FROM todo WHERE done = true'))
}

export async function clearAll() {

    return (await pool.query('DELETE from todo'))
}