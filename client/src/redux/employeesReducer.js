import { API_URL } from '../config'

export const getAllEmployees = ({ employees }) => {
	return employees
}

const createActionName = actionName => `app/employees/${actionName}`
const LOAD_EMPLOYEES = createActionName('LOAD_EMPLOYEES')
const UPDATE_EMPLOYEES = createActionName('UPDATE_EMPLOYEE')

export const loadEmployees = payload => ({ type: LOAD_EMPLOYEES, payload })
export const updateEmployee = payload => ({ type: UPDATE_EMPLOYEES, payload })

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
			return [...action.payload]
		case UPDATE_EMPLOYEES:
			return statePart.map(employee => (employee.id === action.payload.id ? { ...action.payload } : employee))
		default:
			return statePart
	}
}

export default employeesReducer
