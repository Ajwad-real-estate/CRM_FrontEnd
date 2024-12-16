import getAgentDashboard from './agentDash.js';
import getManagerDashboard from './managerDash.js';

const getDashboard = async (req, res) => {
	console.log(req.user);
	const user_role = req.user.role;
	console.log(user_role);

	if (user_role === 'Sales Manager'){
		 return getManagerDashboard(req, res);

	}else {
		return getAgentDashboard(req, res);

	};


};


export default getDashboard;
