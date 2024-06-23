const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()

function getHrManagers() {
	return [
		{
			id: 'g7h8i9jk-6l3m-9n4o-5p0q-90r4s7tu8v91',
			fullName: 'Charlie Green',
			subdivision: 'HR',
			position: 'HR_MANAGER',
			status: 'ACTIVE',
			outOfOfficeBalance: 15,
			photo: null,
			peoplePartnerId: 'g7h8i9jk-6l3m-9n4o-5p0q-90r4s7tu8v91',
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
			peoplePartnerId: 'g7h8i9jk-6l3m-9n4o-5p0q-90r4s7tu8v91',
			outOfOfficeBalance: 5,
			photo: null,
		},

		{
			id: 'c3d4e6fd-2g9b-5h0d-1e9f-56f1e39b9c87',
			fullName: 'Michael Jordan',
			subdivision: 'SALES',
			position: 'PROJECT_MANAGER',
			status: 'ACTIVE',
			peoplePartnerId: 'g7h8i9jk-6l3m-9n4o-5p0q-90r4s7tu8v91',
			outOfOfficeBalance: 8,
			photo: null,
		},
		{
			id: 'd4e5f7ge-3h1c-6i1f-2g0a-67g2f4ac0d98',
			fullName: 'Tom Smith',
			subdivision: 'IT',
			position: 'ADMINISTRATOR',
			status: 'ACTIVE',
			peoplePartnerId: 'g7h8i9jk-6l3m-9n4o-5p0q-90r4s7tu8v91',
			outOfOfficeBalance: 12,
			photo: null,
		},

		{
			id: 'f6g7h8ij-5k2l-8m3n-4o0p-89q3r6st7u80',
			fullName: 'Bob White',
			subdivision: 'IT',
			position: 'PROJECT_MANAGER',
			status: 'ACTIVE',
			peoplePartnerId: 'g7h8i9jk-6l3m-9n4o-5p0q-90r4s7tu8v91',
			outOfOfficeBalance: 9,
			photo: null,
		},

		{
			id: 'h8i9j0kl-7m4n-0o5p-6q0r-01s5t8uv9w02',
			fullName: 'Diana Black',
			subdivision: 'IT',
			position: 'ADMINISTRATOR',
			status: 'ACTIVE',
			peoplePartnerId: 'g7h8i9jk-6l3m-9n4o-5p0q-90r4s7tu8v91',
			outOfOfficeBalance: 7,
			photo: null,
		},
		{
			id: 'b2c3d5ec-1f8a-4893-9c3e-45e0d29b8c76',
			fullName: 'Jane Smith',
			subdivision: 'SALES',
			position: 'EMPLOYEE',
			status: 'ACTIVE',
			outOfOfficeBalance: 10,
			photo: null,
			peoplePartnerId: 'g7h8i9jk-6l3m-9n4o-5p0q-90r4s7tu8v91',
		},
		{
			id: 'e5f6g8hi-4j1k-7l2m-3n0o-78p2q5rs6t79',
			fullName: 'Alice Brown',
			subdivision: 'SALES',
			position: 'EMPLOYEE',
			status: 'ACTIVE',
			outOfOfficeBalance: 6,
			photo: null,
			peoplePartnerId: 'g7h8i9jk-6l3m-9n4o-5p0q-90r4s7tu8v91',
		},
	]
}

function getLeaveRequests() {
	return [
		{
			id: 'e1f1b4fc-8b19-4c4a-98e8-647d1e0c57c9',
			employeeId: 'e1f1b4fc-8b19-4c4a-98e8-647d1e0c57c8',
			absenceReason: 'HOLIDAY',
			startDate: new Date('2024-07-01T00:00:00Z'),
			endDate: new Date('2024-07-10T00:00:00Z'),
			comment: 'Family trip',
			status: 'SUBMITTED',
		},
		{
			id: 'e1f1b4fc-8b19-4c4a-98e8-647d1e0c57e9',
			employeeId: 'e1f1b4fc-8b19-4c4a-98e8-647d1e0c57c8',
			absenceReason: 'HOLIDAY',
			startDate: new Date('2024-07-17T00:00:00Z'),
			endDate: new Date('2024-07-24T00:00:00Z'),
			comment: 'Family trip',
			status: 'NEW',
		},
		{
			id: 'h8i9j0kl-7m4n-0o5p-6q0r-01s5t8uv9w07',
			employeeId: 'h8i9j0kl-7m4n-0o5p-6q0r-01s5t8uv9w02',
			absenceReason: 'SICK_LEAVE',
			startDate: new Date('2024-06-25T00:00:00Z'),
			endDate: new Date('2024-06-30T00:00:00Z'),
			comment: 'Flu',
			status: 'APPROVED',
		},
	]
}

function getApprovalRequests() {
	return [
		{
			employeeId: 'e1f1b4fc-8b19-4c4a-98e8-647d1e0c57c8',
			leaveRequestID: 'e1f1b4fc-8b19-4c4a-98e8-647d1e0c57c9',
			status: 'NEW',
		},
		{
			employeeId: 'h8i9j0kl-7m4n-0o5p-6q0r-01s5t8uv9w02',
			leaveRequestID: 'h8i9j0kl-7m4n-0o5p-6q0r-01s5t8uv9w07',
			status: 'APPROVED',
		},
	]
}

function getProjects() {
	return [
		{
			projectType: 'UPDATE',
			startDate: new Date('2024-01-15T00:00:00Z'),
			endDate: new Date('2024-07-30T00:00:00Z'),
			comment: 'Complete redesign of the corporate website',
			status: 'ACTIVE',
			projectManagerId: 'f6g7h8ij-5k2l-8m3n-4o0p-89q3r6st7u80',
		},
		{
			projectType: 'INSTALLATION',
			startDate: new Date('2024-03-01T00:00:00Z'),
			endDate: new Date('2024-08-15T00:00:00Z'),
			comment: 'Upgrade the existing HR system to the latest version',
			status: 'ACTIVE',
			projectManagerId: 'f6g7h8ij-5k2l-8m3n-4o0p-89q3r6st7u80',
		},
	]
}
async function seed() {
	await db.approvalRequest.deleteMany()
	await db.leaveRequest.deleteMany()
	await db.project.deleteMany()
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

	await Promise.all(
		getLeaveRequests().map(leaveRequest => {
			return db.leaveRequest.create({ data: leaveRequest })
		})
	)

	await Promise.all(
		getApprovalRequests().map(approvalRequest => {
			return db.approvalRequest.create({ data: approvalRequest })
		})
	)

	await Promise.all(
		getProjects().map(project => {
			return db.project.create({ data: project })
		})
	)
}

seed()
