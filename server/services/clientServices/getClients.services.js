import { getPool } from "../../configs/dbConfig.js";

export const getClientsService = async (user) => {
  const pool = await getPool();

  const { role, id: agentId } = user;
  console.log("user from getClientsService" + user)
  try {
    if (role === "Sales Manager") {
      const getAllClients = `SELECT * FROM client;`;
      const { rows } = await pool.query(getAllClients);

      return rows;
      
    } else {
      const getAgentClients = `SELECT * FROM client WHERE agent_id = $1`;
      //SELECT * FROM client WHERE agent_id = b23a934a-afd6-4427-8e5d-1cdf50d03eb2
      const { rows } = await pool.query(getAgentClients, [agentId]);
console.log(rows)
      return rows;
    }
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw new Error("Unable to fetch clients. Please try again.");
  }
};
