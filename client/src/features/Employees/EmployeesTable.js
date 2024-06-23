import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { deactivateEmployee, fetchEmployees, getAllEmployees, updateEmployee } from '../../redux/employeesReducer'
import { API_URL } from '../../settings/config'
import Button from '../../common/Button/Button'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import { fetchStatuses, statusesObj } from '../../settings/settings'
import { sortASC } from '../../settings/utils'
import EditAddEmployeeModal from './EditAddEmployeeModal'

const EmployeesTable = () => {
	const employees = useSelector(state => getAllEmployees(state))
	const dispatch = useDispatch()
	const [sortBy, setSortBy] = useState({ key: 'fullName' })
	const [showModal, setShowModal] = useState(false)
	const [currentEmployee, setCurrentEmployee] = useState(null)
	const [updatedEmployee, setUpdatedEmployee] = useState({})
	const [status, setStatus] = useState(fetchStatuses.null)
	const sortedData = sortASC(employees, sortBy)

	const handleEditClick = employee => {
		setCurrentEmployee(employee)
		setUpdatedEmployee(employee)
		setShowModal(true)
	}

	const handleChange = e => {
		const { name, value } = e.target
		setUpdatedEmployee(previous => ({
			...previous,
			[name]: value,
		}))
	}

	const handleDeactivate = id => {
		const options = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
		}
		fetch(`${API_URL}/employees/${id}`, options)
			.then(res => {
				if (res.status === 200) {
					setStatus(fetchStatuses.success)
					dispatch(deactivateEmployee({ id }))
					dispatch(fetchEmployees)
				} else {
					setStatus(fetchStatuses.serverError)
				}
			})
			.catch(e => setStatus(fetchStatuses.serverError))
	}

	if (!employees) return
	return (
		<>
			{status === fetchStatuses.loading && <LoadingSpinner />}

			{employees.length !== 0 && (
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
									<Button color='#3c8d2f80' text={'Edit'} onClick={() => handleEditClick(employee)}>
										Edit
									</Button>
									{employee.status !== statusesObj.inactive && (
										<Button color='gray' text={'Deactivate'} onClick={() => handleDeactivate(employee.id)}>
											Deactivate
										</Button>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}

			{currentEmployee && (
				<EditAddEmployeeModal
					showModal={showModal}
					setShowModal={setShowModal}
					handleChange={handleChange}
					updatedEmployee={updatedEmployee}
					action='Edit'
				/>
			)}
		</>
	)
}

export default EmployeesTable
