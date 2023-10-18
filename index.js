require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const socket = require("./socket");

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.z60e7ey.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      // useCreateIndex: true,
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("connected");
  });

app.use(express.json());

const { userRouter } = require("./api/routes/users.routes");
app.use("/users", userRouter);

const { patientRouter } = require("./api/routes/patients.routes");
app.use("/patients", patientRouter);

const { appointmentRouter } = require("./api/routes/appointment.routes");
app.use("/appointment", appointmentRouter);

app.use("/", (req, res) => {
  return res.status(404).json({
    message: "No such route found",
  });
});

const server = app.listen(5000, (req, res) => {
  console.log("server is running");
});

socket.connect(server);
