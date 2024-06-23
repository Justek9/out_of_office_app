import { rolesObj } from './settings'

export const sortASC = (array, sortBy) => {
	return (array = array.sort((a, b) => {
		if (a[sortBy.key] < b[sortBy.key]) {
			return -1
		} else if (a[sortBy.key] > b[sortBy.key]) {
			return 1
		} else {
			return 0
		}
	}))
}

export const isActionEdit = action => {
	return action === 'Edit' ? true : false
}

export const getIdBasedOnName = (name, array) => {
	const person = array.find(person => person.fullName.trim().toUpperCase() === name.trim().toUpperCase())
	if (person) return person.id
	else return null
}

export const isAdmin = role => {
	return role === rolesObj.admin ? true : false
}

export const isHRManager = role => {
	return role === rolesObj.hrManager ? true : false
}

export const isEmployee = role => {
	return role === rolesObj.employee ? true : false
}

export const isPM = role => {
	return role === rolesObj.PM ? true : false
}
