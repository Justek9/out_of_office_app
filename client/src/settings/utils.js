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
