import { getPool } from "../../configs/dbConfig.js";

const handleLogout = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(400);

  const pool = await getPool();

  try {
    // Delete the refresh token from the database
    const checkRefreshTokenQuery = `
      DELETE FROM refresh_tokens WHERE refresh_token = $1;
    `;
    const { rowCount } = await pool.query(checkRefreshTokenQuery, [
      refreshToken,
    ]);

    // Return not found if no refresh token in database
    if (rowCount === 0) {
      return res.status(404).json({ message: "Refresh Token not found." });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error("Error during user logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default handleLogout;
