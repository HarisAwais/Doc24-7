/* 
    -   IMPORTING MODULES
*/
const multer = require("multer");
const fs = require("fs");

/* MULTER FUNCTIONS */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    userId = req.generatedId;

    cb(null, "public/users/" + userId + "/");
  },
  filename: (req, file, cb) => {
    try {
      userId = req.generatedId;

      /* IF FILE ALREADY EXISTS, DELETE THE PREVIOUS FILE */
      const fullFilePath = `./public/users/${userId}/${file.originalname}`;

      // console.log('file path 1 ', fullFilePath)
      /* IF FILE EXISTS, THEN DELETE THE FILE AND PASTE A NEW FILE THERE */

      if (fs.existsSync(fullFilePath)) {
        fs.unlinkSync(fullFilePath);
      }

      /* 
              IF A FILE IN THE GIVEN DIRECTORY DOES NOT EXIST
              ,THEN CREATE A NEW FILE THERE OTHERWISE LEAVE AS IT IS
            */

      fs.mkdirSync("public/users/" + userId + "/", { recursive: true });

      req.filename = `${file.originalname}`;

      let filename = req.filename;

      req.fullFilePath = fullFilePath;

      cb(null, filename);
    } catch (error) {
      console.log("error in user profile upload", error);
    }
  },
});

const limits = {
  fileSize: 1024 * 1024, // 1MB
};

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/svg+xml"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "ERROR: You are trying to upload a file with unsupported file type. Only .csv files are supported."
      ),
      false
    );
  }
};

/* INITIALIZING MULTER */
const uploadUserProfile = multer({ storage, limits, fileFilter });

module.exports = uploadUserProfile;
