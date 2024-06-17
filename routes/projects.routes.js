const express = require('express')
const router = express.Router()
const projects = require('../controllers/projects.controller')

router.get('/projects', projects.getAll)
router.put('/projects/:id', projects.edit)
router.patch('/projects/:id', projects.changeStatus)
router.post('/projects', projects.add)

module.exports = router
