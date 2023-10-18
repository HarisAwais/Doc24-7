const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      uppercase: true,
    },
    lastName: {
      type: String,
      required: true,
      uppercase: true,
    },
    userProfilePhotoPath: {
      type: String,
    },
    age: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
      enum: ["MALE", "FEMALE"],
    },
    status: {
      type: String,
      required: true,
      enum: ["ACTIVE", "INACTIVE"],
    },
    systemRoles: [
      {
        role: {
          type: String,
          required: true,
          enum: ["DOCTOR", "CLINICAL STAFF", "ADMIN"],
        },
        shift: {
          type: String,
          required: true,
          enum: ["MORNING", "EVENING"],
        },
        department: {
          type: String,
          required: true,
          enum: ["PSYCHOLOGY", "REGULAR", "HEART"],
        },
      },
    ],
  },
  {
    timestamps: true,
    _id: true,
  }
);

module.exports = mongoose.model("User", userSchema);
