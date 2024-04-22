const Person = require('../model/personModel.js')



const getList = async (req, res) => {
	try {
		const personList = await Person.find({})
		res.status(200).json(personList)
	} catch (e) {
		res.status(500).json({ message: e.message })
	}
}

const getPerson = async (req, res) => {
	try {
		const { id } = req.params
		const personToFind = await Person.findById(id)
		res.status(200).json(personToFind)
	} catch (e) {
		res.status(500).json({ message: e.message })
	}
}

const postPerson = async (req, res) => {
	try {
		const person = await Person.create(req.body)
		res.status(200).json(person)
	} catch (e) {
		res.status(500).json({ message: e.message })
	}
}


const modifPerson = async (req, res) => {
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
}

const delPerson = async (req, res) => {
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
}

module.exports = {
	getList,
	getPerson,
	postPerson,
	modifPerson,
	delPerson
}
