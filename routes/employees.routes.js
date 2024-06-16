const express = require('express')
const router = express.Router()
const employees = require('../controllers/employees.controller')

router.get('/employees', employees.getAll)
router.put('/employees/:id', employees.edit)
router.patch('/employees/:id', employees.changeStatus)

module.exports = router
