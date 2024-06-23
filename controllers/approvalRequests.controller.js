const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getAll = async (req, res) => {
	try {
		const approvalRequests = await prisma.approvalRequest.findMany({
			include: {
				approver: {
					select: {
						fullName: true,
						id: true,
					},
				},
				leaveRequest: {
					include: {
						employee: {
							select: {
								id: true,
								fullName: true,
							},
						},
					},
				},
			},
		})
		res.json(approvalRequests)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

exports.changeStatus = async (req, res) => {
	const { status, leaveRequestID } = req.body
	const id = req.params.id
	console.log(status)

	try {
		const approvalRequest = await prisma.approvalRequest.findUnique({
			where: {
				id: id,
			},
		})

		if (approvalRequest) {
			await prisma.approvalRequest.update({
				where: {
					id: id,
				},
				data: {
					status: status,
				},
			})

			const leaveRequest = await prisma.leaveRequest.findUnique({
				where: {
					id: leaveRequestID,
				},
				include: { employee: true },
			})

			if (leaveRequest) {
				await prisma.leaveRequest.update({
					where: {
						id: leaveRequestID,
					},
					data: {
						status: status,
					},
				})

				if (status === 'APPROVED') {
					const startDate = new Date(leaveRequest.startDate)
					const endDate = new Date(leaveRequest.endDate)
					const leaveDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1
					await prisma.employee.update({
						where: { id: leaveRequest.employeeId },
						data: { outOfOfficeBalance: leaveRequest.employee.outOfOfficeBalance - leaveDays },
					})
				}

				res.status(201).json({
					message: 'Leave request and approval request updated',
				})
			} else {
				res.status(404).json('Leave request not found')
			}
		} else {
			res.status(404).json('Approval request not found')
		}
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

