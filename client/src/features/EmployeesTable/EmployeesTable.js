import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { deactivateEmployee, fetchEmployees, getAllEmployees, updateEmployee } from '../../redux/employeesReducer'
import EditEmployeeModal from '../EditAddEmployeeModal/EditAddEmployeeModal'
import { API_URL } from '../../config'
import Button from '../../common/Button/Button'

const EmployeesTable = () => {
	const employees = useSelector(state => getAllEmployees(state))
	const dispatch = useDispatch()
	const [sortBy, setSortBy] = useState({ key: 'fullName' })
	const [showModal, setShowModal] = useState(false)
	const [currentEmployee, setCurrentEmployee] = useState(null)
	const [updatedEmployee, setUpdatedEmployee] = useState({})
	const [status, setStatus] = useState(null)
	// null, 'loading', 'success', 'serverError',

	const sortedData = employees.sort((a, b) => {
		if (a[sortBy.key] < b[sortBy.key]) {
			return -1
		} else {
			return 1
		}
	})

	const handleEditClick = employee => {
		setCurrentEmployee(employee)
		setUpdatedEmployee(employee)
		setShowModal(true)
	}

	const handleSave = () => {
		setStatus('loading')
		const options = {
			method: 'PUT',
			body: JSON.stringify(updatedEmployee),
			headers: {
				'Content-Type': 'application/json',
			},
		}

		fetch(`${API_URL}/employees/${updatedEmployee.id}`, options)
			.then(res => {
				if (res.status === 200) {
					setStatus('success')
					dispatch(updateEmployee(updatedEmployee))
					dispatch(fetchEmployees)
					setShowModal(false)
				} else {
					setStatus('serverError')
				}
			})
			.catch(e => setStatus('serverError'))

		setShowModal(false)
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
					setStatus('success')
					dispatch(deactivateEmployee({ id }))
					dispatch(fetchEmployees)
				} else {
					setStatus('serverError')
				}
			})
			.catch(e => setStatus('serverError'))
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
								<Button color='blue' text={'Edit'} onClick={() => handleEditClick(employee)}>
									Edit
								</Button>
								<Button color='gray' text={'Deactivate'} onClick={() => handleDeactivate(employee.id)}>
									Deactivate
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
					updatedEmployee={updatedEmployee}
					action='Edit'
				/>
			)}
		</>
	)
}

export default EmployeesTable
