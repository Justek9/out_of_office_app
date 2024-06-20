import { useState } from 'react'
import { Button, Modal, Form, FormGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProjectManagers } from '../../redux/employeesReducer'
import { API_URL } from '../../settings/config'

import { fetchStatuses, projectTypesArr as projectTypes, statusesArray } from '../../settings/settings'
import { getIdBasedOnName, isActionEdit } from '../../settings/utils'
import { addProject, fetchProjects, updateProject } from '../../redux/projectsReducer'

const EditAddProjectModal = ({ show, handleClose, project, onSave, action }) => {
	const [formData, setFormData] = useState({ ...project })

	const [newProject, setNewProject] = useState({
		projectType: '',
		startDate: '',
		endDate: '',
		comment: '',
		status: '',
		projectManager: '',
	})

	const [status, setStatus] = useState()
	const dispatch = useDispatch()

	const projectManagers = useSelector(state => getProjectManagers(state))

	const handleChange = e => {
		const { name, value } = e.target
		let id
		if (name === 'projectManager') {
			id = getIdBasedOnName(value, projectManagers)
		}

		name === 'projectManager'
			? setFormData(prevState => ({
					...prevState,
					[name]: value,
					projectManagerId: id,
			  }))
			: setFormData(prevState => ({ ...prevState, [name]: value }))
	}

	const handleSubmit = () => {
		const idNew = getIdBasedOnName(newProject.projectManager, projectManagers)
		const startDate = isActionEdit(action) ? new Date(formData.startDate) : new Date(newProject.startDate)
		const endDate = isActionEdit(action) ? new Date(formData.endDate) : new Date(newProject.endDate)

		const addProjectData = JSON.stringify({ ...newProject, projectManagerId: idNew, startDate, endDate })
		const editProjectData = JSON.stringify({ ...formData, startDate, endDate })

		const options = {
			method: isActionEdit(action) ? 'PUT' : 'POST',
			body: isActionEdit(action) ? editProjectData : addProjectData,
			headers: {
				'Content-Type': 'application/json',
			},
		}
		fetch(isActionEdit(action) ? `${API_URL}/projects/${formData.id}` : `${API_URL}/projects`, options)
			.then(res => {
				if (res.status === 200) {
					setStatus(fetchStatuses.success)
					isActionEdit(action) ? dispatch(updateProject(formData)) : dispatch(addProject(newProject))
					handleClose()
				} else {
					setStatus(fetchStatuses.serverError)
				}
			})

			.catch(() => setStatus(fetchStatuses.serverError))
	}

	const handleAddNew = (field, value) => {
		setNewProject({ ...newProject, [field]: value })
	}

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{isActionEdit(action) ? 'Edit' : 'Add'} Project</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group>
						<Form.Label>Project Type</Form.Label>
						<Form.Control
							as='select'
							name='projectType'
							value={isActionEdit(action) ? formData.projectType : newProject.projectType}
							onChange={e => (isActionEdit(action) ? handleChange(e) : handleAddNew('projectType', e.target.value))}>
							<option value=''>Please select</option>
							{projectTypes.map(type => (
								<option key={type} value={type}>
									{type}
								</option>
							))}
						</Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Label>Start Date</Form.Label>
						<Form.Control
							type='date'
							name='startDate'
							value={isActionEdit(action) ? formData.startDate.slice(0, 10) : newProject.startDate}
							onChange={e => (isActionEdit(action) ? handleChange(e) : handleAddNew('startDate', e.target.value))}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>End Date</Form.Label>
						<Form.Control
							type='date'
							name='endDate'
							value={isActionEdit(action) ? formData.endDate.slice(0, 10) : newProject.endDate}
							onChange={e => (isActionEdit(action) ? handleChange(e) : handleAddNew('endDate', e.target.value))}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Comment</Form.Label>
						<Form.Control
							type='text'
							name='comment'
							value={isActionEdit(action) ? formData.comment : newProject.comment}
							onChange={e => (isActionEdit(action) ? handleChange(e) : handleAddNew('comment', e.target.value))}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Status</Form.Label>
						<Form.Control
							as='select'
							name='status'
							value={isActionEdit(action) ? formData.status : newProject.status}
							readOnly={isActionEdit(action) ? true : false}
							onChange={e => (isActionEdit(action) ? '' : handleAddNew('status', e.target.value))}>
							<option value=''>Please select</option>

							{statusesArray.map(status => (
								<option key={status} value={status}>
									{status}
								</option>
							))}
						</Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Label>Project Manager</Form.Label>
						<Form.Control
							as='select'
							name='projectManager'
							value={isActionEdit(action) ? formData.projectManager.fullName : newProject.projectManager}
							onChange={e => (isActionEdit(action) ? handleChange(e) : handleAddNew('projectManager', e.target.value))}>
							<option value=''>Please select</option>
							{projectManagers.map(pm => (
								<option key={pm.fullName} value={pm.fullName}>
									{pm.fullName}
								</option>
							))}
						</Form.Control>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={handleClose}>
					Close
				</Button>
				<Button variant='primary' onClick={handleSubmit}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
export default EditAddProjectModal
