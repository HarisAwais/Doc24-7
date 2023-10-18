const Patient = require("../schemas/patient.schema");

const savePatient = async (patientId, patientData, opts) => {
  try {
    const patient = new Patient({
      _id: patientId,
      ...patientData,
    });
    const savedPatient = await patient.save(opts);

    if (savedPatient) {
      return {
        status: "SUCCESS",
        data: savedPatient,
      };
    } else {
      return {
        status: "FAILED",
      };
    }
  } catch (error) {
    return {
      status: "INTERNAL_SERVER_ERROR",
      error: error.message,
    };
  }
};

const getPatientByEmail = async (email) => {
  try {
    const patient = await Patient.findOne({ email: email }).lean().exec();

    if (patient) {
      return {
        status: "SUCCESS",
        data: patient,
      };
    } else {
      return {
        status: "FAILED",
      };
    }
  } catch (error) {
    return {
      status: "INTERNAL_SERVER_ERROR",
      error: error.message,
    };
  }
};

const getAllPatients = async () => {
  try {
    const patients = await Patient.find().lean().exec();

    if (patients.length > 0) {
      return {
        status: "SUCCESS",
        data: patients,
      };
    } else {
      return {
        status: "FAILED",
      };
    }
  } catch (error) {
    return {
      status: "INTERNAL_SERVER_ERROR",
      error: error.message,
    };
  }
};

const getPatientById = async (_id) => {
  try {
    const patient = await Patient.findById(_id).lean().exec();

    if (patient) {
      return {
        status: "SUCCESS",
        data: patient,
      };
    } else {
      return {
        status: "FAILED",
      };
    }
  } catch (error) {
    return {
      status: "INTERNAL_SERVER_ERROR",
      error: error.message,
    };
  }
};

const updatePatient = async (conditionObj, updateObj, options) => {
  try {
    const updatedPatient = await Patient.findOneAndUpdate(
      conditionObj,
      updateObj,
      options
    )
      .lean()
      .exec();

    if (updatedPatient) {
      return {
        status: "SUCCESS",
        data: updatedPatient,
      };
    } else {
      return {
        status: "FAILED",
      };
    }
  } catch (error) {
    return {
      status: "INTERNAL_SERVER_ERROR",
      error: error,
    };
  }
};

module.exports = {
  savePatient,
  getPatientByEmail,
  getAllPatients,
  getPatientById,
  updatePatient,
};
