import { API_URL } from '../config'

const createActionName = actionName => `app/employees/${actionName}`
const LOAD_EMPLOYEES = createActionName('LOAD_EMPLOYEES')

export const loadEmployees = payload => ({ type: LOAD_EMPLOYEES, payload })

export const fetchEmployees = () => {
	return dispatch => {
		fetch(`${API_URL}/employees`)
			.then(res => {
				return res.json()
			})
			.then(ads => {
				dispatch(loadEmployees(ads))
			})
			.catch(error => {
				console.log(error)
			})
	}
}

const employeesReducer = (statePart = [], action) => {
	switch (action.type) {
		case LOAD_EMPLOYEES:
			console.log(statePart);
			return [...action.payload]

		default:
			return statePart
	}
}

export default employeesReducer
