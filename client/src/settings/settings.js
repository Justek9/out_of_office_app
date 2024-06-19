export const rolesObj = {
	employee: 'EMPLOYEE',
	hrManager: 'HR_MANAGER',
	PM: 'PROJECT_MANAGER',
	admin: 'ADMINISTRATOR',
}
export const rolesArray = Object.values(rolesObj)

export const subdivisionsObj = {
	hr: 'HR',
	sales: 'SALES',
	it: 'IT',
}
export const subdivisionsArray = Object.values(subdivisionsObj)

export const statusesObj = {
	active: 'ACTIVE',
	inactive: 'INACTIVE',
}
export const statusesArray = Object.values(statusesObj)

export const fetchStatuses = {
	loading: 'loading',
	serverError: 'server error',
	clientError: 'client error',
	success: 'success',
	null: null,
}

export const requestStatus = {
	new: 'NEW',
	approved: 'APPROVED',
	rejected: 'REJECTED',
}

export const projectType = {
	research: 'RESEARCH',
	modify: 'MODIFY',
	update: 'UPDATE',
	installation: 'INSTALLATION',
}

export const absenceReason = {
	sickLeave: 'SICK_LEAVE',
	holiday: 'HOLIDAY',
	other: 'OTHER',
}
