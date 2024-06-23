import { Button } from 'react-bootstrap'

const FiltersButtons = ({ handleClear, handleHide, handleShow, showFilters }) => {
	return (
		<>
			{!showFilters && (
				<Button className='mr-4' text='Show filters' onClick={handleShow} variant='link'>
					Show filters
				</Button>
			)}
			{showFilters && (
				<>
					<Button className='mr-4' text='Clear filters' onClick={handleClear} variant='link'>
						Clear filters
					</Button>
					<Button className='mr-4' text='Hide filters' onClick={handleHide} variant='link'>
						Hide filters
					</Button>
				</>
			)}
		</>
	)
}

export default FiltersButtons
