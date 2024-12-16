import { getPool } from "../../configs/dbConfig.js";

const rolesTitles = async (req, res) => {
  console.log("Fetching roles titles");

  const pool = await getPool();

  try {
    // Uncomment and modify this section if you need to restrict access based on the user's role
    // const { roleId } = req.user; // Assuming `req.user` is populated via authentication middleware
    // if (roleId !== "manager") {
    //   return res.status(403).json({ message: "Access denied." });
    // }

    // Query to fetch role details
    const rolesQuery = `SELECT id, title FROM role;`;
    const { rows: roles } = await pool.query(rolesQuery);

    // If no roles are found, return a 404
    if (roles.length === 0) {
      return res.status(404).json({ message: "No roles found." });
    }

    res.status(200).json({ roles });
  } catch (error) {
    console.error("Error fetching roles-titles:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export default rolesTitles;
