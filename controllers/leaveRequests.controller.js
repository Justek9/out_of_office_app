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

exports.edit = async (req, res) => {
	console.log('jestem w edit')
	try {
		let { absenceReason, startDate, endDate, comment } = req.body

		const id = req.params.id

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
					absenceReason,
					startDate,
					endDate,
					comment,
				},
			})
			res.send({ message: 'Leave request updated' })
		} else {
			res.status(404).json('Leave request  not found')
		}
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

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
	console.log('jestem w add')
	const { absenceReason, startDate, endDate, comment, employeeId } = req.body

	try {
		const newLeaveRequest = await prisma.leaveRequest.create({
			data: {
				employeeId,
				absenceReason,
				startDate,
				endDate,
				comment,
				status: 'NEW',
			},
		})

		res.status(201).json({
			message: 'Leave request added',
		})
	} catch (error) {
		res.status(500).json({ error: 'Failed to add leave request' })
	}
}
