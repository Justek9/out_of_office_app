import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchEmployees } from './redux/employeesReducer'
import NotFound from './pages/NotFound/NotFound'
import Login from './pages/Login/Login'
import NavBar from './layout/Nav/NavBar'
import TopBar from './layout/TopBar/TopBar'
import Employees from './features/Employees/Employees'
import LeaveRequests from './features/LeaveRequests/LeaveRequests'
import ApprovalRequests from './features/ApprovalRequests/ApprovalRequests'
import Projects from './features/Projects/Projects'

function App() {
	const dispatch = useDispatch()

	useEffect(() => dispatch(fetchEmployees()), [dispatch])

	return (
		<Container>
			<TopBar />
			<NavBar />
			<Routes>
				<Route path='/' element={<Login />}></Route>
				<Route path='/lists/employees' element={<Employees />}></Route>
				<Route path='/lists/projects' element={<Projects />}></Route>
				<Route path='/lists/leave-requests' element={<LeaveRequests />}></Route>
				<Route path='/lists/approval-requests' element={<ApprovalRequests />}></Route>
				<Route path='/*' element={<NotFound />}></Route>
			</Routes>
		</Container>
	)
}

export default App
