const User = require("../schemas/user.schema");
const Appointment = require("../schemas/appointment.schema");

const saveUser = async (userId, userData, opts) => {
  try {
    const user = new User({
      _id: userId,
      ...userData,
    });
    const savedUser = await user.save(opts);

    if (savedUser) {
      return {
        status: "SUCCESS",
        data: savedUser,
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

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email }).lean().exec();

    if (user) {
      return {
        status: "SUCCESS",
        data: user,
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

const getAllUsers = async () => {
  try {
    const users = await User.find().lean().exec();

    if (users.length > 0) {
      return {
        status: "SUCCESS",
        data: users,
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

const getMyAppointments = async (_docId) => {
  try {
    console.log(_docId);
    const myAppointments = await Appointment.find({ _docId: _docId })
      .lean()
      .exec();

    if (myAppointments.length > 0) {
      return {
        status: "SUCCESS",
        data: myAppointments,
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

const getUserById = async (_id) => {
  try {
    const user = await User.findById(_id).lean().exec();

    if (user) {
      return {
        status: "SUCCESS",
        data: user,
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

const updateUser = async (conditionObj, updateObj, options) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      conditionObj,
      updateObj,
      options
    )
      .lean()
      .exec();

    if (updatedUser) {
      return {
        status: "SUCCESS",
        data: updatedUser,
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
  saveUser,
  getUserByEmail,
  getAllUsers,
  getUserById,
  updateUser,
  getMyAppointments,
};