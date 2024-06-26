import { useState } from 'react'
import Button from '../../common/Button/Button'
import Header from '../../common/Header/Header'
import EmpoyeesTable from './EmployeesTable'
import EditAddEmployeeModal from './EditAddEmployeeModal'

const Employees = () => {
	const [showModal, setShowModal] = useState(false)

	return (
		<>
			<Header text={'Employees'} />
			<Button text={'Add new'} color='#3c8d2f80' onClick={() => setShowModal(true)} />
			<EmpoyeesTable />
			{showModal && <EditAddEmployeeModal showModal={showModal} setShowModal={setShowModal} action='Add' />}
		</>
	)
}

export default Employees
