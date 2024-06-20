import { API_URL } from '../settings/config'

export const getLeaveRequests = ({ leaveRequests }) => {
	return leaveRequests
}

const createActionName = actionName => `app/LeaveRequest/${actionName}`
const LOAD_LEAVE_REQUESTS = createActionName('LOAD_LEAVE_REQUESTS')
const UPDATE_LEAVE_REQUEST = createActionName('UPDATE_LEAVE_REQUEST')
const CHANGE_STATUS_LEAVE_REQUEST = createActionName('CHANGE_STATUS_LEAVE_REQUEST')
const ADD_LEAVE_REQUEST = createActionName('ADD_LEAVE_REQUEST')

export const loadLeaveRequests = payload => ({ type: LOAD_LEAVE_REQUESTS, payload })
export const updateLeaveRequest = payload => ({ type: UPDATE_LEAVE_REQUEST, payload })
export const changeStatusLeaveRequest = payload => ({ type: CHANGE_STATUS_LEAVE_REQUEST, payload })
export const addLeaveRequest = payload => ({ type: ADD_LEAVE_REQUEST, payload })

export const fetchLeaveRequests = () => {
	return dispatch => {
		fetch(`${API_URL}/leaveRequests`)
			.then(res => {
				return res.json()
			})
			.then(leaveRequests => {
				dispatch(loadLeaveRequests(leaveRequests))
			})
			.catch(error => {
				console.log(error)
			})
	}
}

const leaveRequestsReducer = (statePart = [], action) => {
	switch (action.type) {
		case LOAD_LEAVE_REQUESTS:
			return [...action.payload]
		case UPDATE_LEAVE_REQUEST:
			return statePart.map(request => (request.id === action.payload.id ? { ...action.payload } : request))
		case CHANGE_STATUS_LEAVE_REQUEST:
			console.log(action.payload)
			return statePart.map(request =>
				request.id === action.payload.id ? { ...request, status: action.payload.status } : request
			)
		case ADD_LEAVE_REQUEST:
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

export default leaveRequestsReducer
