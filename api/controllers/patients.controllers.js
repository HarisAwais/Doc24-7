const PatientModel = require("../models/patients.models");
const bcrypt = require("bcryptjs");
const { signToken } = require("../helpers/signToken");

const addPatient = async (req, res, next) => {
  try {
    const { password } = req.body;

    // Generating salt and hashing the password
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);

    req.body.patientProfilePhotoPath = req?.fullFilePath;

    const savedPatient = await PatientModel.savePatient(
      req.patientId,
      req.body
    );

    savedPatient.status === "SUCCESS"
      ? res.status(201).json({
          message: "SUCCESS",
          user: savedPatient.data,
        })
      : res.status(500).json({
          message: savedPatient.status,
          error: savedPatient.error,
        });
  } catch (error) {
    return res.status(500).json({
      message: "SORRY: Something went wrong",
    });
  }
};

const loginPatient = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const patientFound = await PatientModel.getPatientByEmail(email);

    console.log(patientFound);
    if (patientFound.status !== "SUCCESS") {
      return res.status(404).json({
        message: "INVALID PATIENT",
      });
    }

    const isMatch = await bcrypt.compare(password, patientFound.data?.password);

    if (isMatch) {
      const signedToken = await signToken(patientFound.data);
      return res.status(200).json({
        message: "SUCCESS",
        token: signedToken,
      });
    } else {
      return res.status(404).json({
        message: "INVALID PATIENT",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "SORRY: Something went wrong",
    });
  }
};

const listPatients = async (req, res, next) => {
  try {
    const patients = await PatientModel.getAllPatients();

    if (patients.status === "SUCCESS") {
      return res.status(200).json({
        message: patients.status,
        data: patients.data,
      });
    } else if (patients.status === "FAILED") {
      return res.status(400).json({
        message: patients.status,
        description: "No Patient found",
      });
    } else {
      return res.status(400).json({
        message: patients.status,
        error: patients.error,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "SORRY: Something went wrong",
    });
  }
};

const getPatientById = async (req, res, next) => {
  try {
    const { patientId } = req.params;

    const patient = await PatientModel.getPatientById(patientId);

    if (patient.status === "SUCCESS") {
      return res.status(200).json({
        message: patient.status,
        data: patient.data,
      });
    } else if (patient.status === "FAILED") {
      return res.status(400).json({
        message: patient.status,
        description: "No Patient found",
      });
    } else {
      return res.status(400).json({
        message: patient.status,
        error: patient.error,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "SORRY: Something went wrong",
    });
  }
};

const updatePatient = async (req, res, next) => {
  try {
    const { patientId } = req.params;

    const updatedPatient = await PatientModel.updatePatient(
      conditionObj,
      updateObj,
      options
    );

    if (updatedPatient) {
      return res.status(200).json({
        message: "SUCCESS",
        data: updatedPatient,
      });
    } else {
      return res.status(404).json({
        message: "FAILED",
        description: "No Patient found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "SORRY: Something went wrong",
    });
  }
};

module.exports = {
  addPatient,
  loginPatient,
  listPatients,
  getPatientById,
  updatePatient,
};
