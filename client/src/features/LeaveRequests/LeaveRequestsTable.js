import { useEffect, useState } from 'react'
import Button from '../../common/Button/Button'
import { Table } from 'react-bootstrap'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import { fetchStatuses, requestStatus } from '../../settings/settings'
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage'
import { sortASC } from '../../settings/utils'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLeaveRequests, getLeaveRequests } from '../../redux/leaveRequestsReducer'
import { API_URL } from '../../settings/config'
import EditAddLeaveRequestModal from './EditAddLeaveRequestModal'
import { getName, getRole } from '../../redux/loggedPersonReducer'

const LeaveRequestsTable = () => {
	const leaveRequests = useSelector(state => getLeaveRequests(state))
	const [sortBy, setSortBy] = useState({ key: 'employee' })
	const [status, setStatus] = useState(fetchStatuses.null)
	const dispatch = useDispatch()
	const [currentLeaveRequest, setCurrentLeaveRequest] = useState(null)
	const [showModal, setShowModal] = useState(false)
	const loggedEmployee = useSelector(state => getName(state))
	const loggedEmployeeRole = useSelector(state => getRole(state))
	const [newLeaveRequest, setNewLeaveRequest] = useState({
		employee: loggedEmployee,
		absenceReason: '',
		startDate: '',
		endDate: '',
		comment: '',
	})

	const sortedData = sortASC(leaveRequests, sortBy)
	const filteredData = sortedData.filter(leaveRequest => leaveRequest.employee.fullName === loggedEmployee)

	useEffect(() => dispatch(fetchLeaveRequests()), [])

	const handleEdit = leaveRequest => {
		setCurrentLeaveRequest(leaveRequest)
		setShowModal(true)
	}

	const handleChangeStatus = (leaveRequest, status) => {
		setCurrentLeaveRequest(leaveRequest)
		setStatus(fetchStatuses.loading)
		const options = {
			method: 'PATCH',
			body: JSON.stringify({ status: status, employeeId: leaveRequest.employee.id }),
			headers: {
				'Content-Type': 'application/json',
			},
		}

		fetch(`${API_URL}/leaveRequests/${leaveRequest.id}`, options)
			.then(res => {
				if (res.status === 200 || res.status === 201) {
					setStatus(fetchStatuses.success)
					dispatch(fetchLeaveRequests())
				} else {
					setStatus(fetchStatuses.serverError)
				}
			})
			.catch(() => setStatus(fetchStatuses.serverError))
	}

	const handleFormChange = e => {
		const { name, value } = e.target
		setCurrentLeaveRequest(prevState => ({ ...prevState, [name]: value }))
	}
	return (
		<>
			{status === fetchStatuses.loading && <LoadingSpinner />}
			{status === fetchStatuses.serverError && <ErrorMessage />}
			{leaveRequests.length !== 0 && (
				<Table responsive='sm'>
					<thead>
						<tr>
							<th>No.</th>
							<th onClick={() => setSortBy({ key: 'employeeId' })}>Employee</th>
							<th onClick={() => setSortBy({ key: 'absenceReason' })}>Absence reason</th>
							<th onClick={() => setSortBy({ key: 'startDate' })}>Start Date</th>
							<th onClick={() => setSortBy({ key: 'endDate' })}>End Date</th>
							<th onClick={() => setSortBy({ key: 'comment' })}>Comment</th>
							<th onClick={() => setSortBy({ key: 'status' })}>Status</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{filteredData.map((leaveRequest, i) => (
							<tr key={i}>
								<td>{i + 1}</td>
								<td>{leaveRequest.employee.fullName}</td>
								<td>{leaveRequest.absenceReason}</td>
								<td>{leaveRequest.startDate.slice(0, 10)}</td>
								<td>{leaveRequest.endDate.slice(0, 10)}</td>
								<td>{leaveRequest.comment}</td>
								<td>{leaveRequest.status}</td>
								<td>
									{leaveRequest.status === requestStatus.new && (
										<>
											<Button color='#3c8d2f80' text={'Edit'} onClick={() => handleEdit(leaveRequest)} />
											<Button
												color='#3c8d2f'
												text={'Submit'}
												onClick={() => handleChangeStatus(leaveRequest, requestStatus.submitted)}
											/>{' '}
										</>
									)}
									{(leaveRequest.status === requestStatus.new || leaveRequest.status === requestStatus.submitted) && (
										<Button
											color='orangered'
											text={'Cancel'}
											onClick={() => handleChangeStatus(leaveRequest, requestStatus.cancelled)}
										/>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
			{showModal && (
				<EditAddLeaveRequestModal
					setShowModal={setShowModal}
					formData={currentLeaveRequest}
					showModal={showModal}
					handleFormChange={handleFormChange}
					action='Edit'
					newLeaveRequest={newLeaveRequest}
					status={status}
					setStatus={setStatus}
				/>
			)}
		</>
	)
}

export default LeaveRequestsTable
