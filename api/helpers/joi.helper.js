const { isValidObjectId } = require(`mongoose`);

// importing required config params
// const { ALLOWED_INCOMING_FILE_TYPES } = require(`../config`);

// custom validator for incoming objectId value
const objectIdValidation = (value, helpers) => {
  // validating incoming value
  if (!isValidObjectId(value)) {
    // this code runs in case incoming value is not a valid object id

    // returning with an error indicating that incoming value is invalid
    return helpers.error(`any.invalid`);
  }

  // returning incoming value if it is valid
  return value;
};

// exporting validation helpers as modules
module.exports = {
  objectIdValidation,
};
