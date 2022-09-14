import express from 'express'
const app = express()

import pool, { clearDoneTasks, deleteTask, setDueDate, setNotes, setPriority } from './db.js'
import { getTasks, fetchtask, addTask, editTitle } from './db.js'


app.use(express.json())

//ROUTES

//get all todo

app.get('/todos', async (req, res) => {
    try {
        const allTodos = await getTasks()
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})


//get a todo

app.get('/todo/:id', async (req, res) => {
    const { id } = req.params
    console.log(req.body)
    try {
        const task = await fetchtask(id)
        res.json(task.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//create a todo

app.post('/todo', async (req, res) => {
    try {
        const { id, title, notes, duedate, priority, done, show } = req.body
        const newTodo = await addTask(id, title, notes, duedate, priority, done, show)
        res.json(newTodo.rows)
    }
    catch (err) {
        console.error(err.message)
    }
})
//update a todo-title

app.put('/todo/:id/title', async (req, res) => {
    try {

        const { id } = req.params//WHERE
        const { title } = req.body//SET

        const updateTodoTitle = await editTitle(title, id)
        res.json('todo updated')
    } catch (err) {
        console.error(err.message)
    }
})
//update notes
app.put('/todo/:id/notes', async (req, res) => {
    try {
        const { id } = req.params
        const { notes } = req.body
        const updateNotes = await setNotes(notes, id)
        res.json('notes updated')
    } catch (err) {
        console.error(err.message)
    }
})

//update duedate
app.put('/todo/:id/duedate', async (req, res) => {
    try {
        const { id } = req.params
        const { duedate } = req.body
        const updateNotes = await setDueDate(duedate, id)
        res.json('duedate updated')
    } catch (err) {
        console.error(err.message)
    }
})

//update priority

app.put('/todo/:id/priority', async (req, res) => {
    try {
        const { id } = req.params
        const { priority } = req.body
        const updateNotes = await setPriority(priority, id)
        res.json('priority updated')
    } catch (err) {
        console.error(err.message)
    }
})

app.delete('/todo/deletedone', async (req, res) => {
    try {
        const deleteDoneTasks = await clearDoneTasks()
        res.json('cleared done tasks')
    } catch (err) {
        console.error(err.message)
    }
})
//delete a todo

app.delete('/todo/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleteTodo = await deleteTask(id)
        res.json('todo was deleted')
    } catch (err) {
        console.error(err.message)
    }
})

app.use(express.static('public'))

const start = () => {
    app.listen(8000, () => { console.log('server is on') })
}
start()
