import { useState } from 'react'
import Button from '../../common/Button/Button'
import Header from '../../common/Header/Header'
import EditAddProjectModal from '../../features/EditAddProjectsModal/EditAddProjectsModal'
import ProjectsTable from '../../features/ProjectsTable/ProjectsTable'

const Projects = () => {
	const [showModal, setShowModal] = useState(false)

	const handleSave = savedProject => {
		setShowModal(false)
	}

	return (
		<>
			<Header text={'Projects'} />
			<Button
				text={'Add new'}
				color='#3c8d2f80'
				onClick={() => {
					setShowModal(true)
				}}
			/>
			<ProjectsTable />
			{showModal && (
				<EditAddProjectModal
					handleClose={() => setShowModal(false)}
					show={showModal}
					setShowModal={setShowModal}
					action='Add'
					onSave={handleSave}
				/>
			)}
		</>
	)
}

export default Projects
