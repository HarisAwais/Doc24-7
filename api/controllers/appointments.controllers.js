const AppointmentModel = require("../models/appointment.models");
const UserModel = require("../models/users.models");
const PatientModel = require("../models/patients.models");
const bcrypt = require("bcryptjs");
const { signToken } = require("../helpers/signToken");
const { DateTime } = require("luxon");
const mongoose = require("mongoose");
const conn = mongoose.connection;

const addAppointment = async (req, res, next) => {
  let session = await conn.startSession();
  session.startTransaction();
  try {
    const opts = { session };
    const { doctor, patient, appointment } = req.body;

    const docId = new mongoose.Types.ObjectId();
    const createdDoctor = await UserModel.saveUser(docId, doctor, opts);

    if (!createdDoctor) {
      await session.abortTransaction();
      await session.endSession();

      console.log("DOCTOR FAILED");

      return res.status(422).json({
        status: "FAILED",
        message: "Sorry, Something went wrong",
      });
    }

    const patientId = new mongoose.Types.ObjectId();
    const createdPatient = await PatientModel.savePatient(
      patientId,
      patient,
      opts
    );

    if (!createdPatient) {
      await session.abortTransaction();
      await session.endSession();

      console.log("PATIENT FAILED");

      return res.status(422).json({
        status: "FAILED",
        message: "Sorry, Something went wrong",
      });
    }

    const appointmentJSDate = new Date(appointment.appointmentDate);

    const startTime = DateTime.fromJSDate(appointmentJSDate).toJSDate();
    const endTime = DateTime.fromJSDate(appointmentJSDate)
      .setZone("Asia/Karachi")
      .plus({ minutes: 20 })
      .toJSDate();

    const { isSlotAvailable } = await AppointmentModel.checkForSlot(
      startTime,
      endTime,
      req.body?._docId
    );

    if (!isSlotAvailable) {
      await session.abortTransaction();
      await session.endSession();

      return res.status(404).json({
        message: "SORRY: no slot available in this time",
      });
    }

    appointment.startTime = startTime;
    appointment.endTime = endTime;

    appointment._docId = docId;
    appointment._patientId = patientId;

    const createdAppointment = await AppointmentModel.saveAppointment(
      appointment,
      opts
    );

    console.log(createdDoctor, createdPatient, createdAppointment);

    if (true) {
      await session.abortTransaction();
      await session.endSession();

      console.log("APPOINTMENT FAILED");

      return res.status(422).json({
        status: "FAILED",
        message: "Sorry, Something went wrong",
      });
    }

    console.log(
      createdDoctor.status,
      createdPatient.status,
      createdAppointment.status
    );

    if (
      createdDoctor.status === "SUCCESS" &&
      createdPatient.status === "SUCCESS" &&
      createdAppointment.status === "SUCCESS"
    ) {
      await session.commitTransaction();
      await session.endSession();

      return res.status(201).json({
        status: "SUCCESS",
        message: "Instant Appointment Created",
      });
    } else {
      await session.abortTransaction();
      await session.endSession();

      console.log("TRANSACTION FAILED");

      return res.status(422).json({
        status: "FAILED",
        message: "Sorry, Something went wrong",
      });
    }
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    await session.endSession();

    return res.status(500).json({
      message: "SORRY: Something went wrong",
    });
  }
};

module.exports = {
  addAppointment,
};
