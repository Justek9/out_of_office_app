import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getName } from '../../redux/loggedPersonReducer'
import Header from '../../common/Header/Header'
import Button from '../../common/Button/Button'
import { fetchStatuses } from '../../settings/settings'
import LeaveRequestsTable from './LeaveRequestsTable'
import EditAddLeaveRequestModal from './EditAddLeaveRequestModal'

const LeaveRequests = () => {
	const [showModal, setShowModal] = useState(false)
	const loggedEmployee = useSelector(state => getName(state))
	const [status, setStatus] = useState(fetchStatuses.null)

	const [newLeaveRequest, setNewLeaveRequest] = useState({
		employee: loggedEmployee,
		absenceReason: '',
		startDate: '',
		endDate: '',
		comment: '',
	})

	const handleFormChange = e => {
		const { name, value } = e.target
		setNewLeaveRequest(prevState => ({ ...prevState, [name]: value }))
	}

	return (
		<>
			<Header text={'Leave Requests'} />
			<Button text={'Add new'} color='#3c8d2f80' onClick={() => setShowModal(true)} />
			<LeaveRequestsTable />
			{showModal && (
				<EditAddLeaveRequestModal
					action={'Add'}
					newLeaveRequest={newLeaveRequest}
					showModal={showModal}
					setShowModal={setShowModal}
					handleFormChange={handleFormChange}
					status={status}
					setStatus={setStatus}
				/>
			)}
		</>
	)
}

export default LeaveRequests
