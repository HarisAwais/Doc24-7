const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema(
  {
    _docId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    _clinicalId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    _patientId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Patient",
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      default: 20,
    },
    status: {
      type: String,
      default: "pending",
    },
    description: {
      type: String,
      required: true,
    },
    fee: {
      type: Number,
      required: true,
      default: 2000,
    },
  },
  {
    timestamps: true,
    _id: true,
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);