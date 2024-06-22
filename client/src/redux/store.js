import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import initialState from './initialState'
import employeesReducer from './employeesReducer'
import loggedPersonReducer from './loggedPersonReducer'
import projectsReducer from './projectsReducer'
import leaveRequestsReducer from './leaveRequestsReducer'
import approvalRequestsReducer from './approvalRequestsReducer'

const subreducers = {
	loggedPerson: loggedPersonReducer,
	employees: employeesReducer,
	projects: projectsReducer,
	leaveRequests: leaveRequestsReducer,
	approvalRequests: approvalRequestsReducer,
}

const reducer = combineReducers(subreducers)
const store = createStore(
	reducer,
	initialState,

	compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f)
)

export default store
