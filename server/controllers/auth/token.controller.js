import { getPool } from "../../configs/dbConfig.js";
import { verifyRefreshToken } from "../../utils/authUtils.js";

const handleToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);

  const pool = await getPool();

  try {
    // Check if the refresh token is in the database
    const checkRefreshTokenQuery = `
      SELECT * FROM refresh_tokens WHERE refresh_token = $1;
    `;
    const { rows: tokens } = await pool.query(checkRefreshTokenQuery, [
      refreshToken,
    ]);

    if (tokens.length < 1) {
      return res.sendStatus(403);
    }

    const { refresh_token: token } = tokens[0];
    console.log(token);

    // Verify the refreshToken and retrieve accessToken
    const accessToken = await verifyRefreshToken(token);

    // Respond with the new access token
    res.status(200).json({
      accessToken,
    });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default handleToken;
