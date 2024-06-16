import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import initialState from './initialState'
import employeesReducer from './employeesReducer'
import loggedRoleReducer from './loggedRoleReducer'


const subreducers = {
	loggedRole: loggedRoleReducer,
	employees: employeesReducer,
}

const reducer = combineReducers(subreducers)
const store = createStore(
	reducer,
	initialState,

	compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f)
)

export default store