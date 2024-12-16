import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function generateAccessToken(user) {
  // return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET); // for testing purpose
}

export function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}

export function verifyRefreshToken(refreshToken) {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      console.log('verifyRefreshToken')
      if (err) return reject(err);
      const accessToken = generateAccessToken(user);
      resolve(accessToken);
    });
  });
}

export function verifyAccessToken(accessToken) {
  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log('verifyAccessToken')
      if (err) return reject(err);
      console.log(user)
      resolve(user);
    });
  });
}
