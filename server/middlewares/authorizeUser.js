import { verifyAccessToken } from "../utils/authUtils.js";

const authorizeUser = async (req, res, next) => {
  // Extract the Authorization header
  // console.log("yousef  :" + res.user.role)
  const authHeader = req.headers["authorization"];
  const role = req.headers["role"];
  console.log(role);
  console.log(authHeader);
  // Extract the token part (Bearer <token>)
  const token = authHeader && authHeader.split(" ")[1];

  // If no token is provided, return Unauthorized
  if (!token) return res.sendStatus(401);
  console.log("token AccessToken" + token)
  try {
    // Verify the token and extract the user payload
    const user = await verifyAccessToken(token);
    // console.log(user)
    // Pass user to the next middleware
    req.user = user;
    next();
  } catch (error) {
    // If token verification fails, return Forbidden
    res.sendStatus(403);
  }
};

export default authorizeUser;
