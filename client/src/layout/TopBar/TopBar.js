import { useDispatch, useSelector } from 'react-redux'
import { getName, getRole, setName, setRole } from '../../redux/loggedPersonReducer'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './TopBar.module.scss'
import Button from '../../common/Button/Button'

const TopBar = () => {
	const location = useLocation()
	const position = useSelector(state => getRole(state))
	const name = useSelector(state => getName(state))
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleLogOut = () => {
		localStorage.removeItem('name')
		localStorage.removeItem('role')
		dispatch(setRole(''))
		dispatch(setName(''))
		navigate('/')
	}
	if (location.pathname === '/') return
	return (
		<section className={styles.topBarContainer}>
			<h4>
				Logged in as: {name}, {position}
			</h4>
			<Button text={'Log out'} color='lightgray' onClick={handleLogOut}>
				Log out
			</Button>
		</section>
	)
}

export default TopBar
