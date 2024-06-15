import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound/NotFound'
import Login from './pages/Login/Login'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchEmployees } from './redux/employeesReducer'

function App() {
	const dispatch = useDispatch()

	useEffect(() => dispatch(fetchEmployees()), [dispatch])

	return (
		<Container>
			<Routes>
				<Route path='/' element={<Login />}></Route>
				<Route path='/*' element={<NotFound />}></Route>
			</Routes>
		</Container>
	)
}

export default App
