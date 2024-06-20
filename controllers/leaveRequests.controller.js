const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getAll = async (req, res) => {
	try {
		const leaveRequests = await prisma.leaveRequest.findMany({
			include: {
				employee: {
					select: {
						fullName: true,
						id: true,
					},
				},
			},
		})
		res.json(leaveRequests)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

exports.edit = async (req, res) => {}

exports.changeStatus = async (req, res) => {
	const { status } = req.body
	const id = req.params.id

	try {
		const leaveRequest = await prisma.leaveRequest.findUnique({
			where: {
				id: id,
			},
		})

		if (leaveRequest) {
			await prisma.leaveRequest.update({
				where: {
					id: id,
				},
				data: {
					status: status,
				},
			})
			
			res.status(201).json({
				message: 'Leave request updated and approval request added',
			})
		} else {
			res.status(404).json('Leave request not found')
		}
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

exports.add = async (req, res) => {
	const { employeeId, absenceReason, startDate, endDate, comment } = req.body

	try {
		const newLeaveRequest = await prisma.leaveRequest.create({
			data: {
				employeeId,
				absenceReason,
				startDate: new Date(startDate),
				endDate: new Date(endDate),
				comment,
			},
		})

		const newApprovalRequest = await prisma.approvalRequest.create({
			data: {
				leaveRequestID: newLeaveRequest.id,
				status: 'NEW',
				employeeId,
			},
		})

		res.status(201).json({
			message: 'Leave request added',
		})
	} catch (error) {
		res.status(500).json({ error: 'Failed to add leave request' })
	}
}
