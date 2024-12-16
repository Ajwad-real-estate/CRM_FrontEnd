import { getPool } from "../../configs/dbConfig.js";

import { todayDate } from "../../utils/dashboardUtils.js";



//MARK: dashboard
const getManagerDashboard = async (req, res) => {
	console.log('manager');

	const pool = await getPool();
	const agentId = req.user.agentId;

	const today = todayDate;
	// console.log(today);

	try {
		// target
		const targetQuery = `select target from agent where id = $1;`;
		const targetResult = await pool.query(targetQuery, [agentId]);
		const target = parseInt(targetResult.rows[0].target, 10);
		// console.log(target);

		// today task
     
		const followUpQuery = `select count(*) from task where agent_id = $1 and type = 'Follow-Up';`;
		const followUpTasks = await pool.query(followUpQuery, [agentId]);
		const followUpCount = parseInt(followUpTasks.rows[0].count, 10);

		// console.log(followUpCount);

		const meetingQuery = `select count(*) from task where agent_id = $1 and type = 'Meeting';`;
		const meetingTasks = await pool.query(meetingQuery, [agentId]);
		const meetingCount = parseInt(meetingTasks.rows[0].count, 10);

		// console.log(meetingCount);

		const callQuery = `select count(*) from task where agent_id = $1 and type = 'Call';`;
		const callTasks = await pool.query(callQuery, [agentId]);
		const callCount = parseInt(callTasks.rows[0].count, 10);

		// console.log(callCount);

		
		const emailQuery = `select count(*) from task where agent_id = $1 and type = 'Email';`;
		const emailTasks = await pool.query(emailQuery, [agentId]);
		const emailCount = parseInt(emailTasks.rows[0].count, 10);

		// console.log(emailCount);


		// new clients
    const newClientsQuery =` select count(*) from client where agent_id = $1 and status = 'new';`;
		const newClients = await pool.query(newClientsQuery, [agentId]);
		const newClientsCount = parseInt(newClients.rows[0].count, 10);

		// console.log(newClientsCount);

		// qualified clients
		const qualifiedClientsQuery =` select count(*) from client where agent_id = $1 and status = 'qualified';`;
		const qualifiedClients = await pool.query(qualifiedClientsQuery, [agentId]);
		const qualifiedClientsCount = parseInt(qualifiedClients.rows[0].count, 10);
		// console.log(qualifiedClientsCount);
	

		// reserved clients
		const reservedClientsQuery =` select count(*) from client where agent_id = $1 and status = 'reserved';`;
		const reservedClients = await pool.query(reservedClientsQuery, [agentId]);
		const reservedClientsCount = parseInt(reservedClients.rows[0].count, 10);

		// console.log(reservedClientsCount);


			// reserved clients
			const doneClientsQuery =` select count(*) from client where agent_id = $1 and status = 'done_deal';`;
			const doneClients = await pool.query(doneClientsQuery, [agentId]);
			const doneClientsCount = parseInt(doneClients.rows[0].count, 10);

			// console.log(doneClientsCount);



		const dashboardList = {
			target: target,
			followUpCount : followUpCount,
			meetingCount: meetingCount,
			callCount : callCount,
			emailCount: emailCount,
			newClientsCount : newClientsCount,
			qualifiedClientsCount : qualifiedClientsCount,
			reservedClientsCount: reservedClientsCount,
			doneClientsCount : doneClientsCount
		};

		console.log(dashboardList);

	
	return res.status(200).json(dashboardList);
	
	}catch (error){
		  console.log(error.message);
			return res.status(500).json({message: "couldn't fetch dashboard data"});
				
			};
	
	
	};
	

export default getManagerDashboard;
