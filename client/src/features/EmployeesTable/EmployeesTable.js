import React, { useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getAllEmployees, updateEmployee } from '../../redux/employeesReducer'
import EditEmployeeModal from '../EditEmployeeModal/EditEmployeeModal'

const EmployeesTable = () => {
	const employees = useSelector(state => getAllEmployees(state))
	const dispatch = useDispatch()
	const [sortBy, setSortBy] = useState({ key: 'fullName' })
	const [showModal, setShowModal] = useState(false)
	const [currentEmployee, setCurrentEmployee] = useState(null)

	const sortedData = employees.sort((a, b) => {
		if (a[sortBy.key] < b[sortBy.key]) {
			return -1
		} else {
			return 1
		}
	})

	const handleEditClick = employee => {
		setCurrentEmployee(employee)
		setShowModal(true)
	}

	const handleSave = () => {
		dispatch(updateEmployee(currentEmployee))
		setShowModal(false)
	}

	const handleChange = e => {
		console.log(e.target)
		const { name, value } = e.target
		setCurrentEmployee(previous => ({
			...previous,
			[name]: value,
		}))
	}

	return (
		<>
			<Table responsive='sm'>
				<thead>
					<tr>
						<th>No.</th>
						<th onClick={() => setSortBy({ key: 'fullName' })}>Name</th>
						<th onClick={() => setSortBy({ key: 'subdivision' })}>Subdivision</th>
						<th onClick={() => setSortBy({ key: 'position' })}>Position</th>
						<th onClick={() => setSortBy({ key: 'status' })}>Status</th>
						<th onClick={() => setSortBy({ key: 'peoplePartner.fullName' })}>People Partner</th>
						<th onClick={() => setSortBy({ key: 'outOfOfficeBalance' })}>Out of office balance</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{sortedData.map((employee, i) => (
						<tr key={i}>
							<td>{i + 1}</td>
							<td>{employee.fullName}</td>
							<td>{employee.subdivision}</td>
							<td>{employee.position}</td>
							<td>{employee.status}</td>
							<td>{employee.peoplePartner?.fullName}</td>
							<td>{employee.outOfOfficeBalance}</td>
							<td>
								<Button variant='primary' onClick={() => handleEditClick(employee)}>
									Edit
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			{currentEmployee && (
				<EditEmployeeModal
					showModal={showModal}
					setShowModal={setShowModal}
					handleSave={handleSave}
					handleChange={handleChange}
					updatedEmployee={currentEmployee}
				/>
			)}
		</>
	)
}

export default EmployeesTable
