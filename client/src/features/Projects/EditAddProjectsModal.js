import { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getActiveProjectManagers } from '../../redux/employeesReducer'
import { API_URL } from '../../settings/config'
import { fetchStatuses, projectTypesArr as projectTypes, statusesArray } from '../../settings/settings'
import { getIdBasedOnName, isActionEdit } from '../../settings/utils'
import { fetchProjects } from '../../redux/projectsReducer'
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import DateAlert from '../../common/DateAlert/DateAlert'
import MissingDataAlert from '../../common/MissingDataAlert/MissingDataAlert'

const EditAddProjectModal = ({ show, handleClose, project, action }) => {
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
	const [dateAlert, setDateAlert] = useState(false)
	const [missingDataAlert, setMissingDataAlert] = useState(false)
	const dispatch = useDispatch()
	const projectManagers = useSelector(state => getActiveProjectManagers(state))
	const isEditing = isActionEdit(action)

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

	const isDataProvided = obj => {
		if (!obj.projectType || !obj.startDate || !obj.endDate || !obj.status || !obj.projectManager)
			setMissingDataAlert(true)
		return
	}

	const handleSubmit = () => {
		isEditing ? isDataProvided(formData) : isDataProvided(newProject)

		const idNew = getIdBasedOnName(newProject.projectManager, projectManagers)
		const startDate = isEditing ? new Date(formData.startDate) : new Date(newProject.startDate)
		const endDate = isEditing ? new Date(formData.endDate) : new Date(newProject.endDate)

		if (endDate < startDate) {
			setDateAlert(true)
			return
		}

		const addProjectData = JSON.stringify({ ...newProject, projectManagerId: idNew, startDate, endDate })
		const editProjectData = JSON.stringify({ ...formData, startDate, endDate })

		const options = {
			method: isEditing ? 'PUT' : 'POST',
			body: isEditing ? editProjectData : addProjectData,
			headers: {
				'Content-Type': 'application/json',
			},
		}
		fetch(isEditing ? `${API_URL}/projects/${formData.id}` : `${API_URL}/projects`, options)
			.then(res => {
				if (res.status === 200) {
					setStatus(fetchStatuses.success)
					dispatch(fetchProjects())
					handleClose()
				} else {
					setStatus(fetchStatuses.clientError)
				}
			})

			.catch(() => setStatus(fetchStatuses.serverError))
	}

	const handleAddNew = (field, value) => {
		setNewProject({ ...newProject, [field]: value })
	}

	return (
		<Modal show={show} onHide={handleClose}>
			{status === fetchStatuses.clientError || (status === fetchStatuses.serverError && <ErrorMessage />)}
			{status === fetchStatuses.loading && <LoadingSpinner />}

			{dateAlert && <DateAlert />}
			{missingDataAlert && <MissingDataAlert />}

			<Modal.Header closeButton>
				<Modal.Title>{isEditing ? 'Edit' : 'Add'} Project</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group>
						<Form.Label>Project Type*</Form.Label>
						<Form.Control
							as='select'
							name='projectType'
							value={isEditing ? formData.projectType : newProject.projectType}
							onChange={e => (isEditing ? handleChange(e) : handleAddNew('projectType', e.target.value))}>
							<option value=''>Please select</option>
							{projectTypes.map(type => (
								<option key={type} value={type}>
									{type}
								</option>
							))}
						</Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Label>Start Date*</Form.Label>
						<Form.Control
							type='date'
							name='startDate'
							value={isEditing ? formData.startDate.slice(0, 10) : newProject.startDate}
							onChange={e => (isEditing ? handleChange(e) : handleAddNew('startDate', e.target.value))}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>End Date*</Form.Label>
						<Form.Control
							type='date'
							name='endDate'
							value={isEditing ? formData.endDate.slice(0, 10) : newProject.endDate}
							onChange={e => (isEditing ? handleChange(e) : handleAddNew('endDate', e.target.value))}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Comment</Form.Label>
						<Form.Control
							type='text'
							name='comment'
							value={isEditing ? formData.comment : newProject.comment}
							onChange={e => (isEditing ? handleChange(e) : handleAddNew('comment', e.target.value))}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Status*</Form.Label>
						<Form.Control
							as='select'
							name='status'
							value={isEditing ? formData.status : newProject.status}
							readOnly={isEditing ? true : false}
							onChange={e => (isEditing ? '' : handleAddNew('status', e.target.value))}>
							<option value=''>Please select</option>

							{statusesArray.map(status => (
								<option key={status} value={status}>
									{status}
								</option>
							))}
						</Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Label>Project Manager*</Form.Label>
						<Form.Control
							as='select'
							name='projectManager'
							value={isEditing ? formData.projectManager.fullName : newProject.projectManager}
							onChange={e => (isEditing ? handleChange(e) : handleAddNew('projectManager', e.target.value))}>
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
