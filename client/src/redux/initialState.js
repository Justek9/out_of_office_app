const initialState = {
	employees: [],
	loggedPerson: { name: localStorage.getItem('name') || '', role: localStorage.getItem('role') || '' },
	projects: [],
	leaveRequests: [],
	approvalRequests: [],
}

export default initialState
