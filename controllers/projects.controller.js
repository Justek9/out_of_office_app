const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getAll = async (req, res) => {
	try {
		const projects = await prisma.project.findMany({
			include: {
				projectManager: {
					select: {
						fullName: true,
						id: true,
					},
				},
			},
		})
		res.json(projects)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

exports.edit = async (req, res) => {}

exports.changeStatus = async (req, res) => {}

exports.add = async (req, res) => {}
