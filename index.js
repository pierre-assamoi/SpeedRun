require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Person = require('./model/personModel')


const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	res.status(200).send("YOLO WORLD !")
})

app.get('/person/list', async (req, res) => {
	try {
		const personList = await Person.find({})
		res.status(200).json(personList)
	} catch (e) {
		res.status(500).json({ message: e.message })
	}
})

app.get('/person/:id', async (req, res) => {
	try {
		const { id } = req.params
		const personToFind = await Person.findById(id)
		res.status(200).json(personToFind)
	} catch (e) {
		res.status(500).json({ message: e.message })
	}
})

app.post('/person/add', async (req, res) => {
	try {
		const person = await Person.create(req.body)
		res.status(200).json(person)
	} catch (e) {
		res.status(500).json({ message: e.message })
	}
})

app.put('/person/:id', async (req, res) => {
	try {
		const { id } = req.params
		const personToUpdate = await Person.findByIdAndUpdate(id, req.body)

		if (!personToUpdate) {
			return res.status(400).json({ message: "-- PERSON NOT FOUND--" })
		}

		const updateDone = await Person.findById(id)

		res.status(200).json(updateDone)

	} catch (e) {
		res.status(500).json({ message: e.message })
	}
})

app.delete('/person/:id', async (req, res) => {
	try {
		const { id } = req.params
		const personToDelete = await Person.findByIdAndDelete(id)

		if (!personToDelete) {
			return res.status(400).json({ message: "-- PERSON NOT FOUND --" })
		}
		res.status(200).json({ message: `${personToDelete.name} has been deleted` })
	} catch (e) {
		res.status(500).json({ message: e.message })
	}
})




mongoose.connect(process.env.DB_URL)
	.then(() => {
		console.log('-- CONNEXION SUCCED --')
		app.listen(8080, () => console.log("APP LISTEN : http://localhost:8080"))
	})
	.catch(() => console.log("-- CONNEXION FAILLED --"))
