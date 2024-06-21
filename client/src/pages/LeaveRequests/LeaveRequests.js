import { useState } from 'react'
import Header from '../../common/Header/Header'
import EditAddLeaveRequestModal from '../../features/EditAddLeaveRequestModal/EditAddLeaveRequestModal'
import LeaveRequestsTable from '../../features/LeaveRequestsTable/LeaveRequestsTable'
import { useSelector } from 'react-redux'
import { getName } from '../../redux/loggedPersonReducer'
import Button from '../../common/Button/Button'

const LeaveRequests = () => {
	const [showModal, setShowModal] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const loggedEmployee = useSelector(state => getName(state))
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
					isEditing={isEditing}
					newLeaveRequest={newLeaveRequest}
					showModal={showModal}
					setShowModal={setShowModal}
					handleFormChange={handleFormChange}
				/>
			)}
		</>
	)
}

export default LeaveRequests
