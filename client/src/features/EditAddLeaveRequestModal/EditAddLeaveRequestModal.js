import { Button, Form, Modal } from 'react-bootstrap'
import { absenceReasonArr, fetchStatuses } from '../../settings/settings'
import { API_URL } from '../../settings/config'
import { getIdBasedOnName } from '../../settings/utils'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEmployees } from '../../redux/employeesReducer'
import { addLeaveRequest, fetchLeaveRequests, updateLeaveRequest } from '../../redux/leaveRequestsReducer'

const EditAddLeaveRequestModal = ({
	showModal,
	setShowModal,
	formData,
	isEditing,
	// dispatch,
	newLeaveRequest,
	handleFormChange,
	status,
	setStatus,
}) => {
	const employees = useSelector(getAllEmployees)
	const dispatch = useDispatch()

	const handleSubmit = () => {
		const employeeId = getIdBasedOnName(newLeaveRequest.employee, employees)
		const startDate = isEditing ? new Date(formData.startDate) : new Date(newLeaveRequest.startDate)
		const endDate = isEditing ? new Date(formData.endDate) : new Date(newLeaveRequest.endDate)

		const addLeaveRequestData = JSON.stringify({ ...newLeaveRequest, startDate, endDate, employeeId })
		const editLeaveRequestData = JSON.stringify({ ...formData, startDate, endDate })

		const options = {
			method: isEditing ? 'PUT' : 'POST',
			body: isEditing ? editLeaveRequestData : addLeaveRequestData,
			headers: {
				'Content-Type': 'application/json',
			},
		}
		fetch(isEditing ? `${API_URL}/leaveRequests/${formData.id}` : `${API_URL}/leaveRequests`, options)
			.then(res => {
				if (res.status === 201 || res.status == 200) {
					setStatus(fetchStatuses.success)
					dispatch(fetchLeaveRequests())
					setShowModal(false)
				} else {
					setStatus(fetchStatuses.serverError)
				}
			})

			.catch(err => fetchStatuses.serverError)
	}

	return (
		<Modal show={showModal} onHide={() => setShowModal(false)}>
			<Modal.Header closeButton>
				<Modal.Title>{isEditing ? 'Edit' : 'Add'} Leave Request</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId='formEmployee'>
						<Form.Label>Employee</Form.Label>
						<Form.Control
							type='text'
							name='employee'
							defaultValue={isEditing ? formData.employee.fullName : newLeaveRequest.employee}
							onChange={isEditing ? handleFormChange : undefined}
							readOnly
						/>
					</Form.Group>
					<Form.Group controlId='formAbsenceReason'>
						<Form.Label>Absence Reason</Form.Label>
						<Form.Control
							as='select'
							name='absenceReason'
							value={isEditing ? formData.absenceReason : newLeaveRequest.absenceReason}
							onChange={handleFormChange}>
							<option value=''>Please select</option>
							{absenceReasonArr.map(reason => (
								<option key={reason} value={reason}>
									{reason}
								</option>
							))}
						</Form.Control>
					</Form.Group>
					<Form.Group controlId='formStartDate'>
						<Form.Label>Start Date</Form.Label>
						<Form.Control
							type='date'
							name='startDate'
							value={isEditing ? formData.startDate.slice(0, 10) : newLeaveRequest.startDate}
							onChange={handleFormChange}
						/>
					</Form.Group>
					<Form.Group controlId='formEndDate'>
						<Form.Label>End Date</Form.Label>
						<Form.Control
							type='date'
							name='endDate'
							value={isEditing ? formData.endDate.slice(0, 10) : newLeaveRequest.endDate}
							onChange={handleFormChange}
						/>
					</Form.Group>
					<Form.Group controlId='formComment'>
						<Form.Label>Comment</Form.Label>
						<Form.Control
							type='text'
							name='comment'
							value={isEditing ? formData.comment : newLeaveRequest.comment}
							onChange={handleFormChange}
						/>
					</Form.Group>
					{isEditing && (
						<Form.Group controlId='formStatus'>
							<Form.Label>Status</Form.Label>
							<Form.Control type='text' name='status' value={formData.status} onChange={handleFormChange} disabled />
						</Form.Group>
					)}
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={() => setShowModal(false)}>
					Close
				</Button>
				<Button variant='primary' onClick={() => handleSubmit()}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default EditAddLeaveRequestModal
