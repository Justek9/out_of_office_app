import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound/NotFound'
import Login from './pages/Login/Login'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchEmployees } from './redux/employeesReducer'
import NavBar from './layout/Nav/NavBar'
import Employees from './pages/Employees/Employees'
import Projects from './pages/Pojects/Projects'
import LeaveRequests from './pages/LeaveRequests/LeaveRequests'
import ApprovalRequests from './pages/ApprovalRequests/ApprovalRequests'

function App() {
	const dispatch = useDispatch()

	useEffect(() => dispatch(fetchEmployees()), [dispatch])

	return (
		<Container>
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
