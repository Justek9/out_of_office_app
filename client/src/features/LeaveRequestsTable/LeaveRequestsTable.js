import { useEffect, useState } from 'react'
import Button from '../../common/Button/Button'
import { Table } from 'react-bootstrap'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import { fetchStatuses, requestStatus } from '../../settings/settings'
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage'
import { sortASC } from '../../settings/utils'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLeaveRequests, getLeaveRequests, loadLeaveRequests } from '../../redux/leaveRequestsReducer'

const LeaveRequestsTable = () => {
	const leaveRequests = useSelector(state => getLeaveRequests(state))
	const [sortBy, setSortBy] = useState({ key: 'employee' })
	const [status, setStatus] = useState(fetchStatuses.null)
	const sortedData = sortASC(leaveRequests, sortBy)
	const dispatch = useDispatch()

	useEffect(() => dispatch(fetchLeaveRequests()), [])

	const handleChangeStatus = () => {}

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
						{sortedData.map((leaveRequest, i) => (
							<tr key={i}>
								<td>{i + 1}</td>
								<td>{leaveRequest.employee.fullName}</td>
								<td>{leaveRequest.absenceReason}</td>
								<td>{leaveRequest.startDate.slice(0, 10)}</td>
								<td>{leaveRequest.endDate.slice(0, 10)}</td>
								<td>{leaveRequest.comment}</td>
								<td>{leaveRequest.status}</td>
								<td>
									<Button color='#3c8d2f80' text={'Edit'} />
									{leaveRequest.status === requestStatus.new && (
										<>
											<Button color='#3c8d2f' text={'Submit'} onClick={handleChangeStatus('submit')} />
											<Button color='orangered' text={'Cancel'} onClick={handleChangeStatus('submit')} />
										</>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	)
}

export default LeaveRequestsTable
