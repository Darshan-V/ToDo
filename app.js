// Imports
const express = require('express')
const app = express()
const port = 8000

app.use(express.static('public'))


app.listen(port, () => console.info(`App listening on port ${port}`))
