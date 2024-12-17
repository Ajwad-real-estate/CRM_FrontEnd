import { getPool } from "../../configs/dbConfig.js";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/authUtils.js";

const handleLogin = async (req, res) => {
  const { identifier, password } = req.body;
  console.log(identifier, password);

  if (!identifier || !password)
    return res.status(400).json({ message: "All fields are required." });

  const pool = await getPool();

  try {
    // Verify the provided identifier with username or email from the database
    const identifierCheckQuery = `
      SELECT username, agent_id, password FROM account WHERE username = $1 OR email = $1;
    `;
    const { rows: accounts } = await pool.query(identifierCheckQuery, [
      identifier,
    ]);

    if (accounts.length < 1) {
      return res.status(401).json({ message: "Wrong identifier." });
    }

    const {
      username,
      agent_id: agentId,
      password: hashedPassword,
    } = accounts[0];
    // console.log(agentId);

    // Verify the provided password with the hashed password from the database
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Wrong password." });
    }

    // Fetch the agent role using it's id
    const agentDetailsQuery = `
      select title,role.id from role join agent on role_id = role.id where agent.id = $1;
    `;
    const { rows: agents } = await pool.query(agentDetailsQuery, [agentId]);
    // console.log(agents)
    const { title: role
      , id: roleId
    } = agents[0];
    // console.log(role);

    // Generate tokens based on the agent details
    const userPayload = { username, agentId, role, roleId };
    console.log(userPayload)

    const accessToken = generateAccessToken(userPayload);
    const refreshToken = generateRefreshToken(userPayload);

    // Store the refreshToken into the database
    const insertRefreshTokenQuery = `
      INSERT INTO refresh_tokens
      VALUES ($1)
    `;
    const tempResult = await pool.query(insertRefreshTokenQuery, [
      refreshToken,
    ]);

    // Response with the user tokens
    res
      .status(200)
      .json({
        accessToken: accessToken, refreshToken: refreshToken
        , user: userPayload
      });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ message: "Internal server error. Please Contact IT Department" });
  }
};

export default handleLogin;
