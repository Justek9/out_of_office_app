import { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addEmployee, fetchEmployees, getPeoplePartners } from '../../redux/employeesReducer'
import { API_URL } from '../../settings/config'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import {
	rolesArray as positions,
	subdivisionsArray as subdivisions,
	statusesArray as statuses,
	subdivisionsObj,
	rolesObj,
	statusesObj,
	fetchStatuses,
} from '../../settings/settings'
import { isActionEdit } from '../../settings/utils'

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

	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prevState => ({ ...prevState, [name]: value }))
	}

	const handleSubmit = () => {
		// heśli edit to fetch z project, jesli add to fetch z dodaniem
		onSave(formData)
		handleClose()
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
							type='text'
							name='projectType'
							value={isActionEdit(action) ? formData.projectType : newProject.projectType}
							onChange={e => (isActionEdit(action) ? handleChange(e) : handleAddNew('projectType', e.target.value))}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Start Date</Form.Label>
						<Form.Control
							type='date'
							name='startDate'
							value={formData.startDate}
							onChange={e => (isActionEdit(action) ? handleChange(e) : handleAddNew('startDate', e.target.value))}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>End Date</Form.Label>
						<Form.Control
							type='date'
							name='endDate'
							value={formData.endDate}
							onChange={e => (isActionEdit(action) ? handleChange(e) : handleAddNew('endDate', e.target.value))}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Comment</Form.Label>
						<Form.Control
							type='text'
							name='comment'
							value={formData.comment}
							onChange={e => (isActionEdit(action) ? handleChange(e) : handleAddNew('comment', e.target.value))}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Status</Form.Label>
						<Form.Control
							type='text'
							name='status'
							value={formData.status}
							onChange={e => (isActionEdit(action) ? handleChange(e) : handleAddNew('status', e.target.value))}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Project Manager</Form.Label>
						<Form.Control
							type='text'
							name='projectManager'
							value={formData.projectManager.fullName}
							onChange={e => (isActionEdit(action) ? handleChange(e) : handleAddNew('projectManager', e.target.value))}
						/>
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
