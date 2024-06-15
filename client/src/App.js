import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Login from './pages/Login'

function App() {
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
