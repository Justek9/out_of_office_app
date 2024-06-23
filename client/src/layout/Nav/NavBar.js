import { NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { isEmployee } from '../../settings/utils'
import { useSelector } from 'react-redux'
import { getRole } from '../../redux/loggedPersonReducer'

const NavBar = () => {
	const role = useSelector(state => getRole(state))
	const location = useLocation()
	if (location.pathname === '/') return

	return (
		<Navbar expand='lg' className='my-3 my-lg-4 px-4 px-lg-5 flex-lg-column'>
			<Navbar.Toggle aria-controls='responsive-nav' />
			<Navbar.Collapse id='responsive-nav' className='pt-2 pt-lg-3 px-4 px-lg-5'>
				{!isEmployee(role) && (
					<Nav.Link className='text-uppercase' as={NavLink} to='/lists/employees'>
						Employees
					</Nav.Link>
				)}
				<Nav.Link className='text-uppercase' as={NavLink} to='/lists/projects'>
					Projects
				</Nav.Link>
				<Nav.Link className='text-uppercase' as={NavLink} to='/lists/leave-requests'>
					Leave requests
				</Nav.Link>
				{!isEmployee(role) && (
					<Nav.Link className='text-uppercase' as={NavLink} to='/lists/approval-requests'>
						Approval requests
					</Nav.Link>
				)}
			</Navbar.Collapse>
		</Navbar>
	)
}

export default NavBar
