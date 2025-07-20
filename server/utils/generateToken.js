import jwt from "jsonwebtoken";

const generateTokenAndCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });
};

export default generateTokenAndCookie;