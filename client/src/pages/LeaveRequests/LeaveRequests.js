import Header from '../../common/Header/Header'
import LeaveRequestsTable from '../../features/LeaveRequestsTable/LeaveRequestsTable'

const LeaveRequests = () => {
	return (
		<>
			<Header text={'Leave Requests'} />
			<LeaveRequestsTable />
		</>
	)
}

export default LeaveRequests
