import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import initialState from './initialState'
import employeesReducer from './employeesReducer'
import loggedPersonReducer from './loggedPersonReducer'
import ProjectsReducer from './projectsReducer'

const subreducers = {
	loggedPerson: loggedPersonReducer,
	employees: employeesReducer,
	projects: ProjectsReducer
}

const reducer = combineReducers(subreducers)
const store = createStore(
	reducer,
	initialState,

	compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f)
)

export default store
