import { getPool } from "../../configs/dbConfig.js";

const getClientById = async (req, res) => {
  const { clientId } = req.params;

  if (!clientId) {
    return res.status(400).json({ message: "Client Id is required." });
  }

  const pool = await getPool();
  try {
    const fetchClientById = `SELECT * FROM client WHERE client_id = $1;`;

    const { rows } = await pool.query(fetchClientById, [clientId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Client not found." });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching client:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export default getClientById;
