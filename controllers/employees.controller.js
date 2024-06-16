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
