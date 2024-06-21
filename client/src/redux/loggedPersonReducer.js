export const getRole = ({ loggedPerson }) => {
	return loggedPerson.role
}

export const getName = ({ loggedPerson }) => {
	return loggedPerson.name
}

const createActionName = actionName => `app/role/${actionName}`
const SET_ROLE = createActionName('SET_ROLE')
const SET_NAME = createActionName('SET_NAME')

export const setRole = payload => ({ type: SET_ROLE, payload })
export const setName = payload => ({ type: SET_NAME, payload })

const loggedPersonReducer = (statePart = {}, action) => {
	switch (action.type) {
		case SET_ROLE:
			localStorage.setItem('role', action.payload)
			return { ...statePart, role: action.payload }
		case SET_NAME:
			localStorage.setItem('name', action.payload)
			return { ...statePart, name: action.payload }
		default:
			return statePart
	}
}

export default loggedPersonReducer
