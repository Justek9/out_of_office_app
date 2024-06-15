const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getAll = async (req, res) => {
	try {
		const employees = await prisma.employee.findMany()
		console.log(employees)
		res.json(employees)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}
