import { API_URL } from '../config'

export const getAllEmployees = ({ employees }) => {
	return employees
}

export const getPeoplePartners = ({ employees }) => {
	let partners = employees.filter(employee => employee.position === 'HR_MANAGER')
	return partners
}

const createActionName = actionName => `app/employees/${actionName}`
const LOAD_EMPLOYEES = createActionName('LOAD_EMPLOYEES')
const UPDATE_EMPLOYEES = createActionName('UPDATE_EMPLOYEE')
const DEACTIVATE_EMPLOYEE = createActionName('DEACTIVATE_EMPLOYEE')
const ADD_EMPLOYEE = createActionName('ADD_EMPLOYEE')

export const loadEmployees = payload => ({ type: LOAD_EMPLOYEES, payload })
export const updateEmployee = payload => ({ type: UPDATE_EMPLOYEES, payload })
export const deactivateEmployee = payload => ({ type: DEACTIVATE_EMPLOYEE, payload })
export const addEmployee = payload => ({ type: ADD_EMPLOYEE, payload })

export const fetchEmployees = () => {
	return dispatch => {
		fetch(`${API_URL}/employees`)
			.then(res => {
				return res.json()
			})
			.then(employees => {
				dispatch(loadEmployees(employees))
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
		case DEACTIVATE_EMPLOYEE:
			return statePart.map(employee =>
				employee.id === action.payload.id ? { ...employee, status: 'INACTIVE' } : employee
			)
		case ADD_EMPLOYEE:
			return [
				...statePart,
				{
					...action.payload,
				},
			]
		default:
			return statePart
	}
}

export default employeesReducer
