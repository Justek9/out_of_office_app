import { useEffect, useState } from 'react'
import { API_URL } from '../../config'
import Button from '../../common/Button/Button'
import { Table } from 'react-bootstrap'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'

const ApprovalRequestsTable = () => {
	const [approvalRequests, setApprovalRequests] = useState([])
	const [sortBy, setSortBy] = useState({ key: 'employee' })

	const [status, setStatus] = useState(null)
	// null, 'loading', 'success', 'serverError',

	useEffect(() => {
		setStatus('loading')

		fetch(`${API_URL}/approvalRequests`)
			.then(res => {
				if (res.status === 200) {
					setStatus('success')
					return res.json()
				}
			})
			.then(approvalRequests => {
				console.log(approvalRequests)
				setApprovalRequests(approvalRequests)
			})
			.catch(error => {
				setStatus('serverError')
			})
	}, [])

	return (
		<>
			{status === 'loading' && <LoadingSpinner />}
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
					{approvalRequests.map((approvalRequest, i) => (
						<tr key={i}>
							<td>{i + 1}</td>
							<td>{approvalRequest.approver.fullName}</td>
							<td>{approvalRequest.comment}</td>
							<td>{approvalRequest.status}</td>
							<td>
								<Button color='blue' text={'Edit'}>
									Edit status
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	)
}

export default ApprovalRequestsTable
