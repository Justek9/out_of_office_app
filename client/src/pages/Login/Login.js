import { useDispatch } from 'react-redux'
import Button from '../../common/Button/Button'
import styles from './Login.module.scss'
import { setRole } from '../../redux/loggedRoleReducer'

const Login = () => {
	const dispatch = useDispatch()
	const roles = ['EMPLOYEE', 'HR_MANAGER', 'PROJECT_MANAGER', 'ADMINISTRATOR']
	const selectRoleHandler = e => {
		e.preventDefault()
		dispatch(setRole(e.target.value))
	}

	return (
		<div className='jumbotron'>
			<h1 className='display-4'>Hello, please log in </h1>
			<hr className='my-4' />
			<label htmlFor='role-select'>Choose a role:</label>
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
			<Button text={'Log in'} onClick={console.log('clicked')} />
		</div>
	)
}

export default Login
