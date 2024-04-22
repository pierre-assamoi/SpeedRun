require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Person = require('./model/personModel')
const PersonRoutes = require('./routes/routes.js')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	res.status(200).send("YOLO WORLD !")
})

app.use('/person', PersonRoutes)





mongoose.connect(process.env.DB_URL)
	.then(() => {
		console.log('-- CONNEXION SUCCED --')
		app.listen(8080, () => console.log("APP LISTEN : http://localhost:8080"))
	})
	.catch(() => console.log("-- CONNEXION FAILLED --"))
