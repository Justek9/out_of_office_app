const express = require('express')
const router = express.Router()
const leaveRequests = require('../controllers/leaveRequests.controller')

router.get('/leaveRequests', leaveRequests.getAll)
router.put('/leaveRequests/:id', leaveRequests.edit)
router.patch('/leaveRequests/:id', leaveRequests.changeStatus)
router.post('/leaveRequests', leaveRequests.add)

module.exports = router
