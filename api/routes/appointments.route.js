const express = require("express");
const appointmentRouter = express.Router();
const { authentication } = require("../middlewares/authentication.middleware");
const { authorization } = require("../middlewares/authorization.middleware");
const { generateId } = require("../middlewares/generateId.middleware.js");
const uploadUserProfile = require("../middlewares/uploadProfile.middleware.js");

const { addAppointment } = require("../controllers/appointment.controllers");

appointmentRouter.post("/", addAppointment);

appointmentRouter.post("/instant", addAppointment);

module.exports = {
  appointmentRouter,
};
