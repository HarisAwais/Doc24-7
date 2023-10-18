const authorization = async (req, res, next) => {
    const roles = req.decodedToken.systemRoles;
  
    if (roles.some((role) => role.role === "ADMIN")) {
      console.log("authorized");
      next();
    } else {
      return res.status(401).json({
        message: "UN AUTHORIZED",
      });
    }
  };
  
  module.exports = {
    authorization,
  };
  