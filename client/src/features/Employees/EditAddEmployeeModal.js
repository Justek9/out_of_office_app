import { useEffect, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addEmployee, fetchEmployees, getActivePeoplePartners } from '../../redux/employeesReducer'
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
import { getIdBasedOnName, isActionEdit } from '../../settings/utils'
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage'

const EditAddEmployeeModal = ({ showModal, setShowModal, handleChange, handleSave, updatedEmployee, action }) => {
	const [status, setStatus] = useState(null)
	const [isBtnDisabled, setIsBtnDisabled] = useState(true)
	const peoplePartners = useSelector(state => getActivePeoplePartners(state))
	const isEditing = isActionEdit(action)

	const dispatch = useDispatch()

	const [newEmployee, setNewEmployee] = useState({
		fullName: '',
		subdivision: subdivisionsObj.hr,
		position: rolesObj.hrManager,
		status: statusesObj.active,
		peoplePartner: '',
		outOfOfficeBalance: '',
	})

	const handleAddNew = (field, value) => {
		setNewEmployee({ ...newEmployee, [field]: value })
	}

	const handleSaveAddNew = () => {
		const peoplePartnerId = getIdBasedOnName(newEmployee.peoplePartner, peoplePartners)

		const options = {
			method: 'POST',
			body: JSON.stringify({ ...newEmployee, peoplePartnerId: peoplePartnerId }),
			headers: {
				'Content-Type': 'application/json',
			},
		}
		fetch(`${API_URL}/employees`, options)
			.then(res => {
				if (res.status === 201) {
					setStatus(fetchStatuses.success)
					setShowModal(false)
					dispatch(fetchEmployees())
				} else {
					setStatus(fetchStatuses.clientError)
				}
			})
			.catch(e => setStatus(fetchStatuses.serverError))
	}

	useEffect(() => {
		if (
			newEmployee.fullName &&
			newEmployee.subdivision &&
			newEmployee.position &&
			newEmployee.status &&
			newEmployee.peoplePartner &&
			newEmployee.outOfOfficeBalance
		)
			setIsBtnDisabled(false)
	}, [newEmployee])

	return (
		<>
			<Modal show={showModal} onHide={() => setShowModal(false)}>
				{status === fetchStatuses.clientError || (status === fetchStatuses.serverError && <ErrorMessage />)}
				{status === fetchStatuses.loading && <LoadingSpinner />}

				<Modal.Header closeButton>
					<Modal.Title>{isEditing ? 'Edit' : 'Add'} Employee</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId='formFullName'>
							<Form.Label>Full Name</Form.Label>
							<Form.Control
								type='text'
								name='fullName'
								value={isEditing ? updatedEmployee.fullName : newEmployee.fullName}
								onChange={e => (isEditing ? handleChange(e) : handleAddNew('fullName', e.target.value))}
							/>
						</Form.Group>
						<Form.Group controlId='formSubdivision'>
							<Form.Label>Subdivision</Form.Label>
							<Form.Control
								as='select'
								name='subdivision'
								onChange={e => (isEditing ? handleChange(e) : handleAddNew('subdivision', e.target.value))}
								value={isEditing ? updatedEmployee.subdivision : newEmployee.subdivision}
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
								value={isEditing ? updatedEmployee.position : newEmployee.position}
								onChange={e => (isEditing ? handleChange(e) : handleAddNew('position', e.target.value))}>
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
								value={isEditing ? updatedEmployee.status : newEmployee.status}
								onChange={e => (isEditing ? handleChange(e) : handleAddNew('status', e.target.value))}>
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
								value={isEditing ? updatedEmployee.peoplePartner?.fullName : newEmployee.peoplePartner}
								onChange={e => (isEditing ? handleChange(e) : handleAddNew('peoplePartner', e.target.value))}>
								<option value=''>--Please choose--</option>
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
								value={isEditing ? updatedEmployee.outOfOfficeBalance : newEmployee.outOfOfficeBalance}
								onChange={e => (isEditing ? handleChange(e) : handleAddNew('outOfOfficeBalance', e.target.value))}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={() => setShowModal(false)}>
						Close
					</Button>
					{!isBtnDisabled && (
						<Button variant='primary' onClick={isEditing ? handleSave : handleSaveAddNew}>
							Save Changes
						</Button>
					)}
				</Modal.Footer>
				{status === fetchStatuses.loading && <LoadingSpinner />}
			</Modal>
		</>
	)
}

export default EditAddEmployeeModal
