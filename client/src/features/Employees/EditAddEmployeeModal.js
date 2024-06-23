import { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmployees, getActivePeoplePartners } from '../../redux/employeesReducer'
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
import MissingDataAlert from '../../common/MissingDataAlert/MissingDataAlert'

const EditAddEmployeeModal = ({ showModal, setShowModal, handleChange, updatedEmployee, action }) => {
	const [status, setStatus] = useState(null)
	const peoplePartners = useSelector(state => getActivePeoplePartners(state))
	const isEditing = isActionEdit(action)
	const [missingDataAlert, setMissingDataAlert] = useState(false)

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

	const isDataProvided = obj => {
		if (
			!obj.fullName ||
			!obj.subdivision ||
			!obj.position ||
			!obj.status ||
			!obj.peoplePartner ||
			!obj.outOfOfficeBalance
		)
			setMissingDataAlert(true)
		return
	}

	const handleSave = () => {
		const peoplePartnerId = getIdBasedOnName(newEmployee.peoplePartner, peoplePartners)

		isEditing ? isDataProvided(updatedEmployee) : isDataProvided(newEmployee)

		setStatus(fetchStatuses.loading)
		const options = {
			method: isEditing ? 'PUT' : 'POST',
			body: isEditing ? JSON.stringify(updatedEmployee) : JSON.stringify({ ...newEmployee, peoplePartnerId }),
			headers: {
				'Content-Type': 'application/json',
			},
		}
		fetch(isEditing ? `${API_URL}/employees/${updatedEmployee.id}` : `${API_URL}/employees`, options)
			.then(res => {
				if (res.status === 201 || res.status == 200) {
					setStatus(fetchStatuses.success)
					dispatch(fetchEmployees())
					setShowModal(false)
				} else {
					setStatus(fetchStatuses.clientError)
				}
			})
			.catch(e => setStatus(fetchStatuses.serverError))
	}

	return (
		<>
			<Modal show={showModal} onHide={() => setShowModal(false)}>
				{status === fetchStatuses.clientError || (status === fetchStatuses.serverError && <ErrorMessage />)}
				{status === fetchStatuses.loading && <LoadingSpinner />}

				{missingDataAlert && <MissingDataAlert />}

				<Modal.Header closeButton>
					<Modal.Title>{isEditing ? 'Edit' : 'Add'} Employee</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId='formFullName'>
							<Form.Label>Full Name*</Form.Label>
							<Form.Control
								type='text'
								name='fullName'
								value={isEditing ? updatedEmployee.fullName : newEmployee.fullName}
								onChange={e => (isEditing ? handleChange(e) : handleAddNew('fullName', e.target.value))}
							/>
						</Form.Group>
						<Form.Group controlId='formSubdivision'>
							<Form.Label>Subdivision*</Form.Label>
							<Form.Control
								as='select'
								name='subdivision'
								onChange={e => (isEditing ? handleChange(e) : handleAddNew('subdivision', e.target.value))}
								value={isEditing ? updatedEmployee.subdivision : newEmployee.subdivision}>
								{subdivisions.map(subdivision => (
									<option key={subdivision} value={subdivision}>
										{subdivision}
									</option>
								))}
							</Form.Control>
						</Form.Group>
						<Form.Group controlId='formPosition'>
							<Form.Label>Position*</Form.Label>
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
							<Form.Label>Status*</Form.Label>
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
							<Form.Label>People Partner*</Form.Label>
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
							<Form.Label>Out of Office Balance*</Form.Label>
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
					<Button variant='primary' onClick={handleSave}>
						Save Changes
					</Button>
				</Modal.Footer>
				{status === fetchStatuses.loading && <LoadingSpinner />}
			</Modal>
		</>
	)
}

export default EditAddEmployeeModal
