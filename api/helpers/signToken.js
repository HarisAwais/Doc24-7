const JWT = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const signToken = async (user) => {
  const tokenData = {
    _id: user._id,
    systemRoles: user.systemRoles,
    session: user.session,
  };

  const signedToken = await JWT.sign(tokenData, JWT_SECRET);
  return signedToken;
};

module.exports = {
  signToken,
};
