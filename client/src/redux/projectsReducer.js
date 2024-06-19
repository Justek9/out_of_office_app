import { API_URL } from '../settings/config'

export const getProjects = ({ projects }) => {
	return projects
}

const createActionName = actionName => `app/projects/${actionName}`
const LOAD_PROJECTS = createActionName('LOAD_PROJECTS')
const UPDATE_PROJECTS = createActionName('UPDATE_EMPLOYEE')
const DEACTIVATE_PROJECT = createActionName('DEACTIVATE_PROJECT')
const ADD_PROJECT = createActionName('ADD_PROJECT')

export const loadProjects = payload => ({ type: LOAD_PROJECTS, payload })
export const updateProject = payload => ({ type: UPDATE_PROJECTS, payload })
export const deactivateProject = payload => ({ type: DEACTIVATE_PROJECT, payload })
export const addProject = payload => ({ type: ADD_PROJECT, payload })

export const fetchProjects = () => {
	return dispatch => {
		fetch(`${API_URL}/projects`)
			.then(res => {
				return res.json()
			})
			.then(projects => {
				dispatch(loadProjects(projects))
			})
			.catch(error => {
				console.log(error)
			})
	}
}

const projectsReducer = (statePart = [], action) => {
	switch (action.type) {
		case LOAD_PROJECTS:
			return [...action.payload]
		case UPDATE_PROJECTS:
			return statePart.map(project => (project.id === action.payload.id ? { ...action.payload } : project))
		case DEACTIVATE_PROJECT:
			return statePart.map(project => (project.id === action.payload.id ? { ...project, status: 'INACTIVE' } : project))
		case ADD_PROJECT:
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

export default projectsReducer
