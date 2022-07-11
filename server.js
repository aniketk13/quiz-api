const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('./src/routes')
const cors = require('cors')

require('dotenv').config()

app.use(cors()) //We're telling express to use cors
app.use(express.json()) //We need to tell server to use json as well
app.use(routes) //tells the server to use the routes in routes.js

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('database connected'))

app.listen(process.env.PORT, () => {
    console.log("The API is running")
})