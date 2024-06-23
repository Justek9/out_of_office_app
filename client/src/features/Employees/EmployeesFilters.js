import { Form } from 'react-bootstrap'

const EmployeesFilters = ({ filters, handleFilterChange }) => {
	return (
		<>
			<h4>Filters:</h4>
			<Form>
				<Form.Group sie='sm' className='mb-1'>
					<Form.Label>Name</Form.Label>
					<Form.Control type='text' name='fullName' value={filters.fullName} onChange={handleFilterChange} />
				</Form.Group>
				<Form.Group sie='sm' className='mb-1'>
					<Form.Label>Subdivision</Form.Label>
					<Form.Control type='text' name='subdivision' value={filters.subdivision} onChange={handleFilterChange} />
				</Form.Group>
				<Form.Group sie='sm' className='mb-1'>
					<Form.Label>Position</Form.Label>
					<Form.Control type='text' name='position' value={filters.position} onChange={handleFilterChange} />
				</Form.Group>
				<Form.Group sie='sm' className='mb-1'>
					<Form.Label>Status</Form.Label>
					<Form.Control type='text' name='status' value={filters.status} onChange={handleFilterChange} />
				</Form.Group>
				<Form.Group sie='sm' className='mb-1'>
					<Form.Label>People partner</Form.Label>
					<Form.Control type='text' name='peoplePartner' value={filters.peoplePartner} onChange={handleFilterChange} />
				</Form.Group>
			</Form>
		</>
	)
}

export default EmployeesFilters
