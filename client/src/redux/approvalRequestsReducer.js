import { API_URL } from '../settings/config'

export const getApprovalRequests = ({ approvalRequests }) => {
	return approvalRequests
}

const createActionName = actionName => `app/approvalRequests/${actionName}`
const LOAD_APPROVAL_REQUESTS = createActionName('LOAD_APPROVAL_REQUESTS')
const UPDATE_APPROVAL_REQUEST = createActionName('UPDATE_APPROVAL_REQUEST')
const CHANGE_STATUS_APPROVAL_REQUEST = createActionName('CHANGE_STATUS_APPROVAL_REQUEST')
const ADD_APPROVAL_REQUEST = createActionName('ADD_APPROVAL_REQUEST')

export const loadApprovalRequests = payload => ({ type: LOAD_APPROVAL_REQUESTS, payload })
export const updateApprovalRequest = payload => ({ type: UPDATE_APPROVAL_REQUEST, payload })
export const changeStatusApprovalRequest = payload => ({ type: CHANGE_STATUS_APPROVAL_REQUEST, payload })
export const addApprovalRequest = payload => ({ type: ADD_APPROVAL_REQUEST, payload })

export const fetchApprovalRequests = () => {
	return dispatch => {
		fetch(`${API_URL}/approvalRequests`)
			.then(res => {
				return res.json()
			})
			.then(approvalRequests => {
				dispatch(loadApprovalRequests(approvalRequests))
			})
			.catch(error => {
				console.log(error)
			})
	}
}

const approvalRequestsReducer = (statePart = [], action) => {
	switch (action.type) {
		case LOAD_APPROVAL_REQUESTS:
			return [...action.payload]
		case UPDATE_APPROVAL_REQUEST:
			return statePart.map(request => (request.id === action.payload.id ? { ...action.payload } : request))
		case CHANGE_STATUS_APPROVAL_REQUEST:
			return statePart.map(request =>
				request.id === action.payload.id ? { ...request, status: action.payload.status } : request
			)
		case ADD_APPROVAL_REQUEST:
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

export default approvalRequestsReducer
