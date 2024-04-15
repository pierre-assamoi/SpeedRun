const mongoose = require('mongoose')

const personSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			required: true,
		},
		town: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true
	}
)


const Person = mongoose.model('Person', personSchema)

module.exports = Person
