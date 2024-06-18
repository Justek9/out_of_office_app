import { useDispatch, useSelector } from 'react-redux'
import Button from '../../common/Button/Button'
import styles from './Login.module.scss'
import { getRole, setName, setRole } from '../../redux/loggedPersonReducer'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import { getAdmins, getEmployyes, getPeoplePartners, getProjectManagers } from '../../redux/employeesReducer'
import OptionsForEmployeeNameSelect from '../../common/OptionsForEmployeeSelect/OptionsForEmployeeSelect'
import { rolesArray as roles } from '../../settings/settings'

const Login = () => {
	const dispatch = useDispatch()

	const selectRoleHandler = e => {
		e.preventDefault()
		dispatch(setRole(e.target.value))
	}

	const selectNameHandler = e => {
		e.preventDefault()
		console.log(e.target)
		dispatch(setName(e.target.value))
	}

	const employees = useSelector(state => getEmployyes(state))
	const projectManagers = useSelector(state => getProjectManagers(state))
	const peoplesPartners = useSelector(state => getPeoplePartners(state))
	const admins = useSelector(state => getAdmins(state))
	const role = useSelector(state => getRole(state))

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
			<Button text={'Log in'} onClick={() => navigate('/lists/employees')} />
		</div>
	)
}

export default Login
