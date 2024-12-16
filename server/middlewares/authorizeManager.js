import { verifyAccessToken } from "../utils/authUtils.js";

const authorizeManager = async (req, res, next) => {
  try {
    await authorizeUser(req, res, async () => {
      // Check if the user's role is 'manager'
      if (req.user.role !== "manager") {
        return res.sendStatus(403); // Forbidden
      }
      next();
    });
  } catch (error) {
    res.sendStatus(403);
  }
};

export default authorizeManager;
