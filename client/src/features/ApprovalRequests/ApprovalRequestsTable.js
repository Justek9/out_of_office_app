import { useEffect, useState } from 'react'
import Button from '../../common/Button/Button'
import { Table } from 'react-bootstrap'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import { fetchStatuses, requestStatus } from '../../settings/settings'
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage'
import { sortASC } from '../../settings/utils'
import { useDispatch, useSelector } from 'react-redux'
import { getApprovalRequests, fetchApprovalRequests } from '../../redux/approvalRequestsReducer'
import { API_URL } from '../../settings/config'

const ApprovalRequestsTable = () => {
	const approvalRequests = useSelector(state => getApprovalRequests(state))
	const [sortBy, setSortBy] = useState({ key: 'approver' })
	const [status, setStatus] = useState(fetchStatuses.null)
	const sortedData = sortASC(approvalRequests, sortBy)
	const dispatch = useDispatch()

	useEffect(() => dispatch(fetchApprovalRequests()), [dispatch])

	const handleStatusChange = (approvalRequest, status) => {
		const options = {
			method: 'PATCH',
			body: JSON.stringify({ ...approvalRequest, status }),
			headers: {
				'Content-Type': 'application/json',
			},
		}
		fetch(`${API_URL}/approvalRequests/${approvalRequest.id}`, options)
			.then(res => {
				if (res.status === 201 || res.status == 200) {
					setStatus(fetchStatuses.success)
					dispatch(fetchApprovalRequests())
				} else {
					setStatus(fetchStatuses.serverError)
				}
			})

			.catch(err => fetchStatuses.serverError)
	}

	return (
		<>
			{status === fetchStatuses.loading && <LoadingSpinner />}
			{status === fetchStatuses.serverError && <ErrorMessage />}

			<Table responsive='sm'>
				<thead>
					<tr>
						<th>No.</th>
						<th onClick={() => setSortBy({ key: 'approver' })}>Approver</th>
						<th onClick={() => setSortBy({ key: 'comment' })}>LR Comment</th>
						<th onClick={() => setSortBy({ key: 'status' })}>Status</th>
						<th onClick={() => setSortBy({ key: 'employeeId' })}>Employee</th>
						<th onClick={() => setSortBy({ key: 'startDate' })}>Start date</th>
						<th onClick={() => setSortBy({ key: 'startDate' })}>End date</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{sortedData.map((approvalRequest, i) => (
						<tr key={i}>
							<td>{i + 1}</td>
							<td>{approvalRequest.approver.fullName}</td>
							<td>{approvalRequest.leaveRequest.comment}</td>
							<td>{approvalRequest.status}</td>
							<td>{approvalRequest.leaveRequest.employee.fullName}</td>
							<td>{approvalRequest.leaveRequest.startDate.slice(0, 10)}</td>
							<td>{approvalRequest.leaveRequest.endDate.slice(0, 10)}</td>
							<td>
								{approvalRequest.status === requestStatus.new && (
									<>
										<Button
											color='#3c8d2f'
											text={'Approve'}
											onClick={() => handleStatusChange(approvalRequest, requestStatus.approved)}
										/>
										<Button
											color='orangered'
											text={'Reject'}
											onClick={() => handleStatusChange(approvalRequest, requestStatus.rejected)}
										/>
									</>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	)
}

export default ApprovalRequestsTable
