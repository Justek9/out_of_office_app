export const getRole = ({ role }) => {
	return role
}

const createActionName = actionName => `app/role/${actionName}`
const SET_ROLE = createActionName('SET_ROLE')

export const setRole = payload => ({ type: SET_ROLE, payload })
const loggedRoleReducer = (statePart = null, action) => {
	switch (action.type) {
		case SET_ROLE:
			return action.payload
		default:
			return statePart
	}
}

export default loggedRoleReducer
