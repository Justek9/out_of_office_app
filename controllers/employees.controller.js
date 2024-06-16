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

		let uploadData = { fullName, subdivision, position, status, outOfOfficeBalance, peoplePartner }
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
				data: uploadData,
			})
			res.send({ message: 'Employee changed' })
		} else {
			res.status(404).json('Employee not found')
		}
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}
