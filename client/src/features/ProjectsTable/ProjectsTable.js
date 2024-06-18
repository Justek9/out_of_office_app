import { useEffect, useState } from 'react'
import { API_URL } from '../../settings/config'
import Button from '../../common/Button/Button'
import { Table } from 'react-bootstrap'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import { fetchStatuses } from '../../settings/settings'
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage'
import { sortASC } from '../../settings/utils'

const ProjectsTable = () => {
	const [projects, setProjects] = useState([])
	const [sortBy, setSortBy] = useState({ key: 'projectType' })
	const [status, setStatus] = useState(fetchStatuses.null)
	const sortedData = sortASC(projects, sortBy)

	useEffect(() => {
		setStatus(fetchStatuses.loading)

		fetch(`${API_URL}/projects`)
			.then(res => {
				if (res.status === 200) {
					setStatus(fetchStatuses.success)
					return res.json()
				}
			})
			.then(projects => {
				setProjects(projects)
			})
			.catch(error => {
				setStatus(fetchStatuses.serverError)
			})
	}, [])

	return (
		<>
			{status === fetchStatuses.loading && <LoadingSpinner />}
			{status === fetchStatuses.serverError && <ErrorMessage />}

			{status === fetchStatuses.success && (
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
						{sortedData.map((project, i) => (
							<tr key={i}>
								<td>{i + 1}</td>
								<td>{project.projectType}</td>
								<td>{project.startDate.slice(0, 10)}</td>
								<td>{project.endDate.slice(0, 10)}</td>
								<td>{project.comment}</td>
								<td>{project.status}</td>
								<td>{project.projectManager.fullName}</td>
								<td>
									<Button color='#3c8d2f80' text={'Edit'}>
										Edit
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	)
}

export default ProjectsTable
