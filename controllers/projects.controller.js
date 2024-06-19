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

exports.edit = async (req, res) => {

	try {
		let { projectType, startDate, endDate, comment, status, projectManagerId } = req.body

		console.log(projectType, startDate, endDate, comment, status, projectManagerId);

		const id = req.params.id

		const project = await prisma.project.findUnique({
			where: {
				id: id,
			},
		})

		if (project) {
			await prisma.project.update({
				where: {
					id: id,
				},
				data: {
					projectType,
					startDate,
					endDate,
					comment,
					status,
					projectManagerId,
				},
			})
			res.send({ message: 'Project updated' })
		} else {
			res.status(404).json('Project not found')
		}
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}
exports.changeStatus = async (req, res) => {}

exports.add = async (req, res) => {
	console.log('jestem w add')
	try {
		let { projectType, startDate, endDate, comment, status, projectManagerId } = req.body
		console.log(projectType, startDate, endDate, comment, status, projectManagerId)

		if (projectType && startDate && endDate && status && projectManagerId) {
			await prisma.project.create({
				data: {
					projectType,
					startDate,
					endDate,
					comment,
					status,
					projectManagerId,
				},
			})
			res.send({ message: 'Project added' })
		} else {
			res.status(400).json('Not enough data')
		}
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}
