import { useEffect, useState } from 'react'
import { API_URL } from '../../config'
import Button from '../../common/Button/Button'
import { Table } from 'react-bootstrap'

const ProjectsTable = () => {
	const [projects, setProjects] = useState([])
	const [sortBy, setSortBy] = useState({ key: 'fullName' })

	const [status, setStatus] = useState(null)
	console.log(projects)
	// null, 'loading', 'success', 'serverError',

	// const sortedProjects = projects.sort((a, b) => {
	// if (a[sortBy.key] < b[sortBy.key]) {
	// return -1
	// } else {
	// return 1
	// }
	// })

	useEffect(() => {
		setStatus('loading')

		fetch(`${API_URL}/projects`)
			.then(res => {
				if (res.status === 200) {
					setStatus('success')
					return res.json()
				}
			})
			.then(projects => {
				setProjects(projects)
			})
			.catch(error => {
				setStatus('serverError')
			})
	}, [])

	return (
		<>
			<Table responsive='sm'>
				<thead>
					<tr>
						<th>No.</th>
						<th onClick={() => setSortBy({ key: 'projectType' })}>Project Type</th>
						<th onClick={() => setSortBy({ key: 'startDate' })}>Start date</th>
						<th onClick={() => setSortBy({ key: 'endDate' })}>End Date</th>
						<th onClick={() => setSortBy({ key: 'comment' })}>Comment</th>
						<th onClick={() => setSortBy({ key: 'status' })}>Status</th>
						<th onClick={() => setSortBy({ key: 'projectManager' })}>Project manager</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{projects.map((project, i) => (
						<tr key={i}>
							<td>{i + 1}</td>
							<td>{project.projectType}</td>
							<td>{project.startDate.slice(0, 10)}</td>
							<td>{project.endDate.slice(0, 10)}</td>
							<td>{project.comment}</td>
							<td>{project.status}</td>
							<td>{project.projectManager.fullName}</td>
							<td>
								<Button color='blue' text={'Edit'}>
									Edit
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	)
}

export default ProjectsTable
