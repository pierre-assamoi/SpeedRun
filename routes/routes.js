const express = require('express')
const router = express.Router()
const { getList, getPerson, postPerson, modifPerson, delPerson } = require('../controller/personController.js')

router.get('/list', getList)

router.get('/:id', getPerson)

router.post('/add', postPerson)

router.put('/:id', modifPerson)

router.delete('/:id', delPerson)


module.exports = router


