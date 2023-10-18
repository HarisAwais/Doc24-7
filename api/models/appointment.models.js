const Appointment = require("../schemas/appointment.schema");

const saveAppointment = async (data, opts) => {
  try {
    const appointment = new Appointment(data);
    const savedAppointment = await appointment.save(opts);

    if (savedAppointment) {
      return {
        status: "SUCCESS",
        data: savedAppointment,
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

const checkForSlot = async (startTime, endTime, _docId) => {
  try {
    const condition = {
      _docId: _docId,
      $and: [{ endTime: { $gt: startTime } }, { startTime: { $lt: endTime } }],
    };
    const overlappedAppointment = await Appointment.findOne(condition)
      .lean()
      .exec();

    if (overlappedAppointment == null) {
      return {
        status: "SUCCESS",
        isSlotAvailable: true,
      };
    } else {
      return {
        status: "FAILED",
        isSlotAvailable: false,
      };
    }
  } catch (error) {
    return {
      status: "INTERNAL_SERVER_ERROR",
      error: error,
    };
  }
};

const updateAppointment = async (condition, update, options) => {
  const updatedAppointment = await Appointment.findOneAndUpdate(
    condition,
    update,
    options
  )
    .lean()
    .exec();

  if (updatedAppointment) {
    return {
      status: "SUCCESS",
      data: updatedAppointment,
    };
  } else {
    return {
      status: "FAILED",
    };
  }
};

module.exports = {
  saveAppointment,
  checkForSlot,
  updateAppointment,
};
