const express = require('express')
const router = express.Router()
const approvalRequests = require('../controllers/approvalRequests.controller')

router.get('/approvalRequests', approvalRequests.getAll)
router.put('/approvalRequests/:id', approvalRequests.edit)
router.patch('/approvalRequests/:id', approvalRequests.changeStatus)
router.post('/approvalRequests', approvalRequests.add)

module.exports = router
