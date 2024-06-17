import { useEffect, useState } from 'react'
import { API_URL } from '../../config'
import Button from '../../common/Button/Button'
import { Table } from 'react-bootstrap'

const LeaveRequestsTable = () => {
	const [leaveRequests, setLeaveRequests] = useState([])
	const [sortBy, setSortBy] = useState({ key: 'employee' })

	const [status, setStatus] = useState(null)
	// null, 'loading', 'success', 'serverError',

	useEffect(() => {
		setStatus('loading')

		fetch(`${API_URL}/leaveRequests`)
			.then(res => {
				if (res.status === 200) {
					setStatus('success')
					return res.json()
				}
			})
			.then(leaveRequests => {
				console.log(leaveRequests)
				setLeaveRequests(leaveRequests)
			})
			.catch(error => {
				setStatus('serverError')
			})
	}, [])

	return (
		<>
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
					{leaveRequests.map((leaveRequest, i) => (
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
								<Button color='blue' text={'Edit'}>
									Edit
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	)
}

export default LeaveRequestsTable
