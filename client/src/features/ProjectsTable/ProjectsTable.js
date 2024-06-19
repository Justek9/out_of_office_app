import { useEffect, useState } from 'react'
import { API_URL } from '../../settings/config'
import Button from '../../common/Button/Button'
import { Table } from 'react-bootstrap'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import { fetchStatuses, statusesObj } from '../../settings/settings'
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage'
import { sortASC } from '../../settings/utils'
import EditAddProjectModal from '../EditAddProjectsModal/EditAddProjectsModal'
import { deactivateProject, fetchProjects, getProjects } from '../../redux/projectsReducer'
import { useDispatch, useSelector } from 'react-redux'

const ProjectsTable = () => {
	const projects = useSelector(state => getProjects(state))
	const [sortBy, setSortBy] = useState({ key: 'projectType' })
	const [status, setStatus] = useState(fetchStatuses.null)
	const [selectedProject, setSelectedProject] = useState(null)
	const [showModal, setShowModal] = useState(false)
	const dispatch = useDispatch()

	const sortedData = sortASC(projects, sortBy)

	useEffect(() => {
		dispatch(fetchProjects())
	}, [])

	const handleSave = () => {
		setShowModal(false)
			}

	const handleEditClick = project => {
		setSelectedProject(project)
		setShowModal(true)
	}

	const handleDeactivate = id => {
		const options = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
		}
		fetch(`${API_URL}/projects/${id}`, options)
			.then(res => {
				if (res.status === 200) {
					setStatus(fetchStatuses.success)
					dispatch(deactivateProject({ id }))
					fetchProjects()
				} else {
					setStatus(fetchStatuses.serverError)
				}
			})
			.catch(e => setStatus(fetchStatuses.serverError))
	}

	return (
		<>
			{status === fetchStatuses.loading && <LoadingSpinner />}
			{status === fetchStatuses.serverError && <ErrorMessage />}

			{projects.length !== 0 && (
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
									<Button color='#3c8d2f80' text={'Edit'} onClick={() => handleEditClick(project)}>
										Edit
									</Button>
									{project.status !== statusesObj.inactive && (
										<Button color='gray' text={'Deactivate'} onClick={() => handleDeactivate(project.id)}>
											Deactivate
										</Button>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
			{selectedProject && showModal && (
				<EditAddProjectModal
					show={showModal}
					handleClose={() => setShowModal(false)}
					project={selectedProject}
					onSave={handleSave}
					action={'Edit'}
				/>
			)}
		</>
	)
}

export default ProjectsTable
