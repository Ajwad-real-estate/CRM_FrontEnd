// import { getPool } from "../../configs/dbConfig.js";
// import { verifyAccessToken } from "../../utils/authUtils.js";

// const userData = async (req, res) => {
//     const authHeader = req.headers.authorization;

//     // Check if Authorization header exists
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ message: "Authorization token is required." });
//     }

//     const token = authHeader.split(" ")[1];

//     try {
//         // Verify the token and extract the user payload
//         const userPayload = verifyAccessToken(token);
//         const { agentId } = userPayload;

//         const pool = await getPool();

//         // Fetch user details based on agentId
//         const userDetailsQuery = `
//             SELECT account.username, agent.id AS agentId, role.title AS role, role.id AS roleId
//             FROM account
//             JOIN agent ON account.agent_id = agent.id
//             JOIN role ON agent.role_id = role.id
//             WHERE agent.id = $1;
//         `;
//         const { rows: users } = await pool.query(userDetailsQuery, [agentId]);

//         if (users.length === 0) {
//             return res.status(404).json({ message: "User not found." });
//         }

//         // Return the user details as the response
//         const { username, agentId: fetchedAgentId, role, roleId } = users[0];
//         res.status(200).json({ username, agentId: fetchedAgentId, role, roleId });
//     } catch (error) {
//         console.error("Error retrieving user data:", error);
//         res.status(401).json({ message: "Invalid or expired token." });
//     }
// };

// export default userData;
