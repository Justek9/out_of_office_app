const express = require('express')
const router = express.Router()
const employees = require('../controllers/employees.controller')

router.get('/employees', employees.getAll)

module.exports = router
