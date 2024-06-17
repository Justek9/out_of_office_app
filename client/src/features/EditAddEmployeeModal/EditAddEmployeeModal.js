import { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addEmployee, fetchEmployees, getPeoplePartners } from '../../redux/employeesReducer'
import { API_URL } from '../../config'

const EditAddEmployeeModal = ({ showModal, setShowModal, handleChange, handleSave, updatedEmployee, action }) => {
	const subdivisions = ['HR', 'SALES', 'IT']
	const positions = ['EMPLOYEE', 'HR_MANAGER', 'PROJECT_MANAGER', 'ADMINISTRATOR']
	const statuses = ['ACTIVE', 'INACTIVE']
	const [status, setStatus] = useState(null)
	const peoplePartners = useSelector(state => getPeoplePartners(state))

	const dispatch = useDispatch()

	const [newEmployee, setNewEmployee] = useState({
		fullName: '',
		subdivision: 'HR',
		position: 'HR_MANAGER',
		status: 'ACTIVE',
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
					setStatus('success')
					dispatch(addEmployee(newEmployee))
					setShowModal(false)
					dispatch(fetchEmployees)
				} else {
					setStatus('serverError')
				}
			})
			.catch(e => setStatus('serverError'))
	}

	return (
		<Modal show={showModal} onHide={() => setShowModal(false)}>
			<Modal.Header closeButton>
				<Modal.Title>{action === 'Edit' ? 'Edit' : 'Add'} Employee</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId='formFullName'>
						<Form.Label>Full Name</Form.Label>
						<Form.Control
							type='text'
							name='fullName'
							value={action === 'Edit' ? updatedEmployee.fullName : newEmployee.fullName}
							onChange={e => (action === 'Edit' ? handleChange(e) : handleAddNew('fullName', e.target.value))}
						/>
					</Form.Group>
					<Form.Group controlId='formSubdivision'>
						<Form.Label>Subdivision</Form.Label>
						<Form.Control
							as='select'
							name='subdivision'
							onChange={e => (action === 'Edit' ? handleChange(e) : handleAddNew('subdivision', e.target.value))}
							value={action === 'Edit' ? updatedEmployee.subdivision : newEmployee.subdivision}
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
							value={action === 'Edit' ? updatedEmployee.position : newEmployee.position}
							onChange={e => (action === 'Edit' ? handleChange(e) : handleAddNew('position', e.target.value))}>
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
							value={action === 'Edit' ? updatedEmployee.status : newEmployee.status}
							onChange={e => (action === 'Edit' ? handleChange(e) : handleAddNew('status', e.target.value))}>
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
							value={action === 'Edit' ? updatedEmployee.peoplePartner?.fullName : newEmployee.peoplePartner}
							onChange={e => (action === 'Edit' ? handleChange(e) : handleAddNew('peoplePartner', e.target.value))}>
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
							value={action === 'Edit' ? updatedEmployee.outOfOfficeBalance : newEmployee.outOfOfficeBalance}
							onChange={e => (action === 'Edit' ? handleChange(e) : handleAddNew('outOfOfficeBalance', e.target.value))}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={() => setShowModal(false)}>
					Close
				</Button>
				<Button variant='primary' onClick={action === 'Edit' ? handleSave : handleSaveAddNew}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default EditAddEmployeeModal
