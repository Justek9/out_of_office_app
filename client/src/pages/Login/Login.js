import { useDispatch, useSelector } from 'react-redux'
import Button from '../../common/Button/Button'
import styles from './Login.module.scss'
import { getName, getRole, setName, setRole } from '../../redux/loggedPersonReducer'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import { getAdmins, getEmployyes, getPeoplePartners, getProjectManagers } from '../../redux/employeesReducer'
import OptionsForEmployeeNameSelect from '../../common/OptionsForEmployeeSelect/OptionsForEmployeeSelect'
import { rolesArray as roles } from '../../settings/settings'
import { useState } from 'react'

const Login = () => {
	const dispatch = useDispatch()

	const role = useSelector(state => getRole(state))
	const name = useSelector(state => getName(state))

	const [selectedRole, setSelectedRole] = useState(role)
	const [selectedName, setSelectedName] = useState('')

	const selectRoleHandler = e => {
		setSelectedRole(e.target.value)
		dispatch(setRole(e.target.value))
	}

	const selectNameHandler = e => {
		setSelectedName(e.target.value)
		dispatch(setName(e.target.value))
	}

	const employees = useSelector(state => getEmployyes(state))
	const projectManagers = useSelector(state => getProjectManagers(state))
	const peoplesPartners = useSelector(state => getPeoplePartners(state))
	const admins = useSelector(state => getAdmins(state))

	const navigate = useNavigate()

	return (
		<div className='jumbotron'>
			<h1 className='display-4'>Hello, please log in </h1>
			<hr className='my-4' />
			<label htmlFor='role-select'>Select role:</label>
			<select
				name='roles'
				id='role-select'
				onChange={e => selectRoleHandler(e)}
				className='form-select form-select-lg mb-3'
				aria-label='.form-select-lg example'>
				value= {selectedRole}
				<option value=''>Please select</option>
				{roles.map((role, i) => (
					<option key={i} value={role}>
						{role}
					</option>
				))}
			</select>
			{role === 'EMPLOYEE' && <OptionsForEmployeeNameSelect array={employees} selectNameHandler={selectNameHandler} />}
			{role === 'HR_MANAGER' && (
				<OptionsForEmployeeNameSelect array={peoplesPartners} selectNameHandler={selectNameHandler} />
			)}
			{role === 'PROJECT_MANAGER' && (
				<OptionsForEmployeeNameSelect array={projectManagers} selectNameHandler={selectNameHandler} />
			)}
			{role === 'ADMINISTRATOR' && (
				<OptionsForEmployeeNameSelect array={admins} selectNameHandler={selectNameHandler} />
			)}
			<Button
				text={'Log in'}
				disabled={role === '' || name === '' ? true : false}
				onClick={() => {
					dispatch(setRole(selectedRole))
					dispatch(setName(selectedName))
					navigate('/lists/employees')
				}}
			/>
		</div>
	)
}

export default Login
