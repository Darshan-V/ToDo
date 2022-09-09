const express = require('express')
const { json, urlencoded } = require('body-parser')
const morgan = require('morgan')
const app = express()
// app.use(express.static('public'))


app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/public/', (req, res) => {

    res.send({ 'message': 'hello' })
})

app.post('/public/src', (req, res) => {
    console.log(req.body)
    res.send()
})

const start = () => {
    app.listen(8000, () => { console.log('server is on') })
}
start()
