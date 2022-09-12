const express = require('express')
const app = express()

const pool = require('./db')

app.use(express.json())

//ROUTES

//get all todo

app.get('/todo', async (req, res) => {
    try {
        const allTodos = await pool.query('select * from todo')
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get a todo

app.get('/todo/:id', async (req, res) => {
    const { id } = req.params
    try {
        const todo = await pool.query('select * from todo where id = $1', [id])
        res.json(todo.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//create a todo

app.post('/todo', async (req, res) => {
    try {
        const { id, title, notes, duedate, priority, done, show } = req.body
        const newTodo = await pool.query('INSERT INTO todo (id, title,notes,duedate,priority,done,show) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [id, title, notes, duedate, priority, done, show]
        )
        res.json(newTodo.rows)
    }
    catch (err) {
        console.error(err.message)
    }
})
//update a todo

app.put('/todo/:id', async (req, res) => {
    try {
        const { id } = req.params//WHERE
        const { title } = req.body//SET

        const updateTodo = await pool.query('UPDATE todo SET title = $1 WHERE id = $2', [title, id])
        res.json('todo updated')
    } catch (err) {
        console.error(err.message)
    }
})
//delete a todo

app.delete('/todo/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleteTodo = await pool.query('delete from todo where id = $1', [id])
        res.json('todo was deleted')
    } catch (err) {
        console.error(err.message)
    }
})


const start = () => {
    app.listen(8000, () => { console.log('server is on') })
}
start()
