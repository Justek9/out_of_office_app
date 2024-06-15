const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()

function getHrManagers() {
	return [
		{
			id: 'g7h8i9jk-6l3m-9n4o-5p0q-90r4s7tu8v91',
			fullName: 'Charlie Green',
			subdivision: 'HR',
			position: 'HR_MANAGER',
			status: 'INACTIVE',
			outOfOfficeBalance: 15,
			photo: null,
		},
		{
			id: 'b2c3d5ec-1f8a-4893-9c3e-45e0d29b8c76',
			fullName: 'Jane Smith',
			subdivision: 'HR',
			position: 'HR_MANAGER',
			status: 'ACTIVE',
			outOfOfficeBalance: 10,
			photo: null,
		},
		{
			id: 'e5f6g8hi-4j1k-7l2m-3n0o-78p2q5rs6t79',
			fullName: 'Alice Brown',
			subdivision: 'HR',
			position: 'HR_MANAGER',
			status: 'ACTIVE',
			outOfOfficeBalance: 6,
			photo: null,
		},
	]
}
function getEmployees() {
	return [
		{
			id: 'e1f1b4fc-8b19-4c4a-98e8-647d1e0c57c8',
			fullName: 'John Doe',
			subdivision: 'SALES',
			position: 'EMPLOYEE',
			status: 'ACTIVE',
			peoplePartnerId: 'b2c3d5ec-1f8a-4893-9c3e-45e0d29b8c76',
			outOfOfficeBalance: 5,
			photo: null,
		},

		{
			id: 'c3d4e6fd-2g9b-5h0d-1e9f-56f1e39b9c87',
			fullName: 'Michael Jordan',
			subdivision: 'SALES',
			position: 'PROJECT_MANAGER',
			status: 'ACTIVE',
			peoplePartnerId: 'b2c3d5ec-1f8a-4893-9c3e-45e0d29b8c76',
			outOfOfficeBalance: 8,
			photo: null,
		},
		{
			id: 'd4e5f7ge-3h1c-6i1f-2g0a-67g2f4ac0d98',
			fullName: 'Tom Smith',
			subdivision: 'IT',
			position: 'ADMINISTRATOR',
			status: 'ACTIVE',
			peoplePartnerId: 'b2c3d5ec-1f8a-4893-9c3e-45e0d29b8c76',
			outOfOfficeBalance: 12,
			photo: null,
		},

		{
			id: 'f6g7h8ij-5k2l-8m3n-4o0p-89q3r6st7u80',
			fullName: 'Bob White',
			subdivision: 'IT',
			position: 'PROJECT_MANAGER',
			status: 'ACTIVE',
			peoplePartnerId: 'b2c3d5ec-1f8a-4893-9c3e-45e0d29b8c76',
			outOfOfficeBalance: 9,
			photo: null,
		},

		{
			id: 'h8i9j0kl-7m4n-0o5p-6q0r-01s5t8uv9w02',
			fullName: 'Diana Black',
			subdivision: 'IT',
			position: 'ADMINISTRATOR',
			status: 'ACTIVE',
			peoplePartnerId: 'e5f6g8hi-4j1k-7l2m-3n0o-78p2q5rs6t79',
			outOfOfficeBalance: 7,
			photo: null,
		},
	]
}

async function seed() {
	await db.employee.deleteMany()

	await Promise.all(
		getHrManagers().map(employee => {
			return db.employee.create({ data: employee })
		})
	)

	await Promise.all(
		getEmployees().map(employee => {
			return db.employee.create({ data: employee })
		})
	)
}

seed()
