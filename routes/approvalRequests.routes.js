const express = require('express')
const router = express.Router()
const approvalRequests = require('../controllers/approvalRequests.controller')

router.get('/approvalRequests', approvalRequests.getAll)
router.patch('/approvalRequests/:id', approvalRequests.changeStatus)

module.exports = router
