const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getAll = async (req, res) => {
	try {
		const employees = await prisma.employee.findMany({
			include: {
				peoplePartner: {
					select: {
						fullName: true,
					},
				},
			},
		})
		res.json(employees)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

exports.edit = async (req, res) => {
	try {
		let { fullName, subdivision, position, status, outOfOfficeBalance, peoplePartner } = req.body
		if (peoplePartner === null) {
			peoplePartner = undefined
		}

		const id = req.params.id
		outOfOfficeBalance = parseInt(outOfOfficeBalance)

		const employee = await prisma.employee.findUnique({
			where: {
				id: id,
			},
		})

		if (employee) {
			await prisma.employee.update({
				where: {
					id: id,
				},
				data: {
					fullName,
					subdivision,
					position,
					status,
					outOfOfficeBalance,
					peoplePartner: {
						update: {
							fullName: peoplePartner?.fullName,
						},
					},
				},
			})
			res.send({ message: 'Employee changed' })
		} else {
			res.status(404).json('Employee not found')
		}
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

exports.changeStatus = async (req, res) => {
	try {
		const id = req.params.id

		const employee = await prisma.employee.findUnique({
			where: {
				id: id,
			},
		})

		if (employee) {
			await prisma.employee.update({
				where: {
					id: id,
				},
				data: {
					status: 'INACTIVE',
				},
			})
			res.send({ message: 'Employee deactivated' })
		} else {
			res.status(404).json('Employee not found')
		}
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

exports.add = async (req, res) => {
	try {
		let { fullName, subdivision, position, status, outOfOfficeBalance, peoplePartnerId } = req.body
		outOfOfficeBalance = parseInt(outOfOfficeBalance)

		if ((fullName, subdivision, position, status, outOfOfficeBalance, peoplePartnerId)) {
			await prisma.employee.create({
				data: {
					fullName,
					subdivision,
					position,
					status,
					outOfOfficeBalance,
					peoplePartnerId,
				},
			})
			res.status(201).send({ message: 'Employee added' })
		} else {
			res.status(400).json('Not enough data')
		}
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}
