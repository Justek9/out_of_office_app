const OptionsForEmployeeNameSelect = ({ array, selectNameHandler }) => {
	return (
		<>
			<label htmlFor='name-select'>Select name:</label>
			<select
				name='name'
				id='name-select'
				onChange={e => selectNameHandler(e)}
				className='form-select form-select-lg mb-3'
				aria-label='.form-select-lg example'>
				<option value=''>Please select</option>

				{array.map((employee, i) => (
					<option key={i} value={employee.fullName}>
						{employee.fullName}
					</option>
				))}
			</select>
		</>
	)
}

export default OptionsForEmployeeNameSelect
