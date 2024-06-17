import Header from '../../common/Header/Header'
import ApprovalRequestsTable from '../../features/ApprovalRequestTable/ApprovalRequestsTable'

const ApprovalRequests = () => {
	return (
		<>
			<Header text={'Approval Requests'} />
			<ApprovalRequestsTable />
		</>
	)
}

export default ApprovalRequests
