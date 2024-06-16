import { Button, Modal, Form } from 'react-bootstrap'

const EditEmployeeModal = ({ showModal, setShowModal, handleChange, handleSave, updatedEmployee }) => {
    const subdivisions = ['HR', 'SALES', 'IT']
	const positions = ['EMPLOYEE', 'HR_MANAGER', 'PROJECT_MANAGER', 'ADMINISTRATOR']
	const status = ['ACTIVE', 'INACTIVE']

	return (
		<Modal show={showModal} onHide={() => setShowModal(false)}>
			<Modal.Header closeButton>
				<Modal.Title>Edit Employee data:</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId='formFullName'>
						<Form.Label>Full Name</Form.Label>
						<Form.Control type='text' name='fullName' value={updatedEmployee.fullName || ''} onChange={handleChange} />
					</Form.Group>
					<Form.Group controlId='formSubdivision'>
						<Form.Label>Subdivision</Form.Label>
						<Form.Control
							as='select'
							name='subdivision'
							value={updatedEmployee.subdivision || ''}
							onChange={handleChange}>
							{subdivisions.map(subdivision => (
								<option key={subdivision} value={subdivision}>
									{subdivision}
								</option>
							))}
						</Form.Control>
					</Form.Group>
					<Form.Group controlId='formPosition'>
						<Form.Label>Position</Form.Label>
						<Form.Control as='select' name='position' value={updatedEmployee.position || ''} onChange={handleChange}>
							{positions.map(position => (
								<option key={position} value={position}>
									{position}
								</option>
							))}
						</Form.Control>
					</Form.Group>
					<Form.Group controlId='formStatus'>
						<Form.Label>Status</Form.Label>
						<Form.Control as='select' name='status' value={updatedEmployee.status || ''} onChange={handleChange}>
							{status.map(status => (
								<option key={status} value={status}>
									{status}
								</option>
							))}
						</Form.Control>
					</Form.Group>
					<Form.Group controlId='formPeoplePartner'>
						<Form.Label>People Partner</Form.Label>
						<Form.Control
							type='text'
							name='peoplePartner.fullName'
							value={updatedEmployee.peoplePartner?.fullName || ''}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group controlId='formOutOfOfficeBalance'>
						<Form.Label>Out of Office Balance</Form.Label>
						<Form.Control
							type='number'
							name='outOfOfficeBalance'
							value={updatedEmployee.outOfOfficeBalance || ''}
							onChange={handleChange}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={() => setShowModal(false)}>
					Close
				</Button>
				<Button variant='primary' onClick={handleSave}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default EditEmployeeModal
