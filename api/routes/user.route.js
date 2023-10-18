const express = require("express");
const userRouter = express.Router();
const { authentication } = require("../middlewares/authentication.middleware");
const { authorization } = require("../middlewares/authorization.middleware");
const { generateId } = require("../middlewares/generateId.middleware.js");
const uploadProfile = require("../middlewares/uploadProfile.middleware.js");
const { validateInput } = require("../middlewares/validateInput.middleware.js");

const { addUserSchema } = require("../validators/user.validator");

const {
  addUser,
  loginUser,
  listUsers,
  getUserById,
  updateUser,
  listMyAppointments,
  updateAppointment,
} = require("../controllers/users.controllers");

userRouter.post(
  "/",
  generateId,
  uploadProfile,
  validateInput(addUserSchema, "BODY"),
  addUser
);

userRouter.get("/login", loginUser);

userRouter.get("/list", authentication, authorization, listUsers);

userRouter.get(
  "/getUserById/:userId",
  authentication,
  authorization,
  getUserById
);

userRouter.get("/listMyAppointments/:docId", listMyAppointments);

userRouter.patch("/update/:userId", updateUser);

userRouter.patch("/updateAppointment/:appointmentId/:docId", updateAppointment);

module.exports = {
  userRouter,
};
