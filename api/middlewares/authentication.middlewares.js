const JWT = require("jsonwebtoken");
const { getUserById } = require("../models/users.models");
const JWT_SECRET = process.env.JWT_SECRET;

const authentication = async (req, res, next) => {
  const bearerToken = req.headers.authorization;

  const token = bearerToken?.split(" ")[1];

  let decodedToken;
  let isSessionMatched;
  try {
    decodedToken = JWT.verify(token, JWT_SECRET);
    req.decodedToken = decodedToken;

    const userFound = await getUserById(decodedToken._id);

    isSessionMatched = userFound.session === decodedToken.session;
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      message: "INVALID USER",
    });
  }

  if (decodedToken && isSessionMatched) {
    next();
  } else {
    return res.status(404).json({
      message: "INVALID USER",
    });
  }
};

module.exports = {
  authentication,
};
