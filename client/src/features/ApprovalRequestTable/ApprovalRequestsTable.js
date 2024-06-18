import { useEffect, useState } from 'react'
import { API_URL } from '../../settings/config'
import Button from '../../common/Button/Button'
import { Table } from 'react-bootstrap'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import { fetchStatuses } from '../../settings/settings'
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage'
import { sortASC } from '../../settings/utils'

const ApprovalRequestsTable = () => {
	const [approvalRequests, setApprovalRequests] = useState([])
	const [sortBy, setSortBy] = useState({ key: 'approver' })
	const [status, setStatus] = useState(fetchStatuses.null)
	const sortedData = sortASC(approvalRequests, sortBy)

	useEffect(() => {
		setStatus(fetchStatuses.loading)

		fetch(`${API_URL}/approvalRequests`)
			.then(res => {
				if (res.status === 200) {
					setStatus(fetchStatuses.success)
					return res.json()
				}
			})
			.then(approvalRequests => {
				setApprovalRequests(approvalRequests)
			})
			.catch(error => {
				setStatus(fetchStatuses.serverError)
			})
	}, [])

	return (
		<>
			{status === fetchStatuses.loading && <LoadingSpinner />}
			{status === fetchStatuses.serverError && <ErrorMessage />}

			{status === fetchStatuses.success && (
				<Table responsive='sm'>
					<thead>
						<tr>
							<th>No.</th>
							<th onClick={() => setSortBy({ key: 'approver' })}>Approver</th>
							<th onClick={() => setSortBy({ key: 'comment' })}>Comment</th>
							<th onClick={() => setSortBy({ key: 'status' })}>Status</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{sortedData.map((approvalRequest, i) => (
							<tr key={i}>
								<td>{i + 1}</td>
								<td>{approvalRequest.approver.fullName}</td>
								<td>{approvalRequest.comment}</td>
								<td>{approvalRequest.status}</td>
								<td>
									<Button color='#3c8d2f80' text={'Edit'}>
										Edit status
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	)
}

export default ApprovalRequestsTable
