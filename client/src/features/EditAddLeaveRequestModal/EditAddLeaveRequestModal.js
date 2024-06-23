import { Button, Form, Modal } from 'react-bootstrap'
import { absenceReasonArr, fetchStatuses } from '../../settings/settings'
import { API_URL } from '../../settings/config'
import { getIdBasedOnName, isActionEdit } from '../../settings/utils'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEmployees } from '../../redux/employeesReducer'
import { fetchLeaveRequests } from '../../redux/leaveRequestsReducer'
import { useEffect, useState } from 'react'
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'

const EditAddLeaveRequestModal = ({
	showModal,
	setShowModal,
	formData,
	action,
	newLeaveRequest,
	handleFormChange,
	setStatus,
	status,
}) => {
	const employees = useSelector(getAllEmployees)
	const dispatch = useDispatch()
	const isEditing = isActionEdit(action)

	const handleSubmit = () => {
		if (
			!isEditing &&
			(!newLeaveRequest.employee ||
				!newLeaveRequest.startDate ||
				!newLeaveRequest.endDate ||
				!newLeaveRequest.absenceReason)
		)
			return alert('Please fill all fields marked with asterisk')

		if (isEditing && (!formData.employee || !formData.startDate || !formData.endDate || !formData.absenceReason))
			return alert('Please fill all fields marked with asterisk')

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
					setStatus(fetchStatuses.clientError)
				}
			})

			.catch(() => fetchStatuses.serverError)
	}

	return (
		<Modal show={showModal} onHide={() => setShowModal(false)}>
			{status === fetchStatuses.clientError || (status === fetchStatuses.serverError && <ErrorMessage />)}
			{status === fetchStatuses.loading && <LoadingSpinner />}
			<Modal.Header closeButton>
				<Modal.Title>{isEditing ? 'Edit' : 'Add'} Leave Request</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId='formEmployee'>
						<Form.Label>Employee*</Form.Label>
						<Form.Control
							type='text'
							name='employee'
							defaultValue={isEditing ? formData.employee.fullName : newLeaveRequest.employee}
							onChange={isEditing ? handleFormChange : undefined}
							readOnly
						/>
					</Form.Group>
					<Form.Group controlId='formAbsenceReason'>
						<Form.Label>Absence Reason*</Form.Label>
						<Form.Control
							as='select'
							name='absenceReason'
							value={isEditing ? formData.absenceReason : newLeaveRequest.absenceReason}
							required
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
						<Form.Label>Start Date*</Form.Label>
						<Form.Control
							type='date'
							name='startDate'
							required
							value={isEditing ? formData.startDate.slice(0, 10) : newLeaveRequest.startDate}
							onChange={handleFormChange}
						/>
					</Form.Group>
					<Form.Group controlId='formEndDate'>
						<Form.Label>End Date*</Form.Label>
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
