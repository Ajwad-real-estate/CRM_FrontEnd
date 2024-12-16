// import jwt from "jsonwebtoken";
// import { getPool } from "../../configs/dbConfig.js";

// const getSalesAgentsMiddleWare = async (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ message: "Unauthorized." });
//     }

//     const token = authHeader.split(" ")[1];

//     try {
//         // Verify token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded; // Attach user info to request object

//         // Optionally: Verify user role from the database
//         const pool = await getPool();
//         const userQuery = `
//       SELECT role_id FROM agent WHERE id = $1;
//     `;
//         const { rows } = await pool.query(userQuery, [decoded.agentId]);

//         if (rows.length < 1) {
//             return res.status(403).json({ message: "Access denied." });
//         }

//         req.user.roleId = rows[0].role_id; // Attach role to request object
//         next();
//     } catch (error) {
//         console.error("Error verifying token:", error);
//         res.status(403).json({ message: "Access denied." });
//     }
// };

// export default getSalesAgentsMiddleWare;
