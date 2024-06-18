import { useEffect, useState } from 'react'
import { API_URL } from '../../settings/config'
import Button from '../../common/Button/Button'
import { Table } from 'react-bootstrap'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import { fetchStatuses } from '../../settings/settings'
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage'
import { sortASC } from '../../settings/utils'

const LeaveRequestsTable = () => {
	const [leaveRequests, setLeaveRequests] = useState([])
	const [sortBy, setSortBy] = useState({ key: 'employee' })
	const [status, setStatus] = useState(fetchStatuses.null)
	const sortedData = sortASC(leaveRequests, sortBy)

	useEffect(() => {
		setStatus(fetchStatuses.loading)

		fetch(`${API_URL}/leaveRequests`)
			.then(res => {
				if (res.status === 200) {
					setStatus(fetchStatuses.success)
					return res.json()
				}
			})
			.then(leaveRequests => {
				console.log(leaveRequests)
				setLeaveRequests(leaveRequests)
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
							<th onClick={() => setSortBy({ key: 'employee' })}>Employee</th>
							<th onClick={() => setSortBy({ key: 'absenceReason' })}>Absence reason</th>
							<th onClick={() => setSortBy({ key: 'startDate' })}>Start Date</th>
							<th onClick={() => setSortBy({ key: 'endDate' })}>End Date</th>
							<th onClick={() => setSortBy({ key: 'comment' })}>Comment</th>
							<th onClick={() => setSortBy({ key: 'status' })}>Status</th>
							<th onClick={() => setSortBy({ key: 'projectManager' })}>Project manager</th>
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
								<td>{leaveRequest.projectManager}</td>
								<td>
									<Button color='#3c8d2f80' text={'Edit'}>
										Edit
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

export default LeaveRequestsTable
