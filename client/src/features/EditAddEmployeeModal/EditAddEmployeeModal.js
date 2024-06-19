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

const EditAddEmployeeModal = ({ showModal, setShowModal, handleChange, handleSave, updatedEmployee, action }) => {
	const [status, setStatus] = useState(null)
	const peoplePartners = useSelector(state => getPeoplePartners(state))

	const dispatch = useDispatch()

	const [newEmployee, setNewEmployee] = useState({
		fullName: '',
		subdivision: subdivisionsObj.hr,
		position: rolesObj.hrManager,
		status: statusesObj.active,
		peoplePartner: 'Alice Brown',
		outOfOfficeBalance: '',
	})

	const getPeoplePartnerId = name => {
		const partner = peoplePartners.find(partner => partner.fullName.trim().toUpperCase() === name.trim().toUpperCase())
		if (partner) return partner.id
		else return null
	}

	const handleAddNew = (field, value) => {
		setNewEmployee({ ...newEmployee, [field]: value })
	}

	const handleSaveAddNew = () => {
		const peoplePartnerId = getPeoplePartnerId(newEmployee.peoplePartner)

		const options = {
			method: 'POST',
			body: JSON.stringify({ ...newEmployee, peoplePartnerId: peoplePartnerId }),
			headers: {
				'Content-Type': 'application/json',
			},
		}
		fetch(`${API_URL}/employees`, options)
			.then(res => {
				if (res.status === 200) {
					setStatus(fetchStatuses.success)
					dispatch(addEmployee(newEmployee))
					setShowModal(false)
					dispatch(fetchEmployees)
				} else {
					setStatus(fetchStatuses.serverError)
				}
			})
			.catch(e => setStatus(fetchStatuses.serverError))
	}

	return (
		<Modal show={showModal} onHide={() => setShowModal(false)}>
			<Modal.Header closeButton>
				<Modal.Title>{isActionEdit(action) ? 'Edit' : 'Add'} Employee</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId='formFullName'>
						<Form.Label>Full Name</Form.Label>
						<Form.Control
							type='text'
							name='fullName'
							value={isActionEdit(action) ? updatedEmployee.fullName : newEmployee.fullName}
							onChange={e => (isActionEdit(action) ? handleChange(e) : handleAddNew('fullName', e.target.value))}
						/>
					</Form.Group>
					<Form.Group controlId='formSubdivision'>
						<Form.Label>Subdivision</Form.Label>
						<Form.Control
							as='select'
							name='subdivision'
							onChange={e => (isActionEdit(action) ? handleChange(e) : handleAddNew('subdivision', e.target.value))}
							value={isActionEdit(action) ? updatedEmployee.subdivision : newEmployee.subdivision}
							fullName>
							{subdivisions.map(subdivision => (
								<option key={subdivision} value={subdivision}>
									{subdivision}
								</option>
							))}
						</Form.Control>
					</Form.Group>
					<Form.Group controlId='formPosition'>
						<Form.Label>Position</Form.Label>
						<Form.Control
							as='select'
							name='position'
							value={isActionEdit(action) ? updatedEmployee.position : newEmployee.position}
							onChange={e => (isActionEdit(action) ? handleChange(e) : handleAddNew('position', e.target.value))}>
							{positions.map(position => (
								<option key={position} value={position}>
									{position}
								</option>
							))}
						</Form.Control>
					</Form.Group>
					<Form.Group controlId='formStatus'>
						<Form.Label>Status</Form.Label>
						<Form.Control
							as='select'
							name='status'
							value={isActionEdit(action) ? updatedEmployee.status : newEmployee.status}
							onChange={e => (isActionEdit(action) ? handleChange(e) : handleAddNew('status', e.target.value))}>
							{statuses.map(status => (
								<option key={status} value={status}>
									{status}
								</option>
							))}
						</Form.Control>
					</Form.Group>
					<Form.Group controlId='formPeoplePartner'>
						<Form.Label>People Partner</Form.Label>
						<Form.Control
							as='select'
							name='peoplePartner'
							value={isActionEdit(action) ? updatedEmployee.peoplePartner?.fullName : newEmployee.peoplePartner}
							onChange={e => (isActionEdit(action) ? handleChange(e) : handleAddNew('peoplePartner', e.target.value))}>
							{peoplePartners.map(partner => (
								<option key={partner.id} value={partner.fullName}>
									{partner.fullName}
								</option>
							))}
						</Form.Control>
					</Form.Group>
					<Form.Group controlId='formOutOfOfficeBalance'>
						<Form.Label>Out of Office Balance</Form.Label>
						<Form.Control
							type='number'
							name='outOfOfficeBalance'
							value={isActionEdit(action) ? updatedEmployee.outOfOfficeBalance : newEmployee.outOfOfficeBalance}
							onChange={e =>
								isActionEdit(action) ? handleChange(e) : handleAddNew('outOfOfficeBalance', e.target.value)
							}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={() => setShowModal(false)}>
					Close
				</Button>
				<Button variant='primary' onClick={isActionEdit(action) ? handleSave : handleSaveAddNew}>
					Save Changes
				</Button>
			</Modal.Footer>
			{status === fetchStatuses.loading && <LoadingSpinner />}
		</Modal>
	)
}

export default EditAddEmployeeModal
