const validator = require("validator");

const UserValidate = (data) => {
  if (!data.firstName || !data.lastName || !data.emailId || !data.password) {
    throw new Error("All fields are mandatory");
  } else if (data.firstName.length < 3 || data.firstName > 30) {
    throw new Error("First name should be between 3 to 30 characters");
  } else if (data.lastName.length < 3 || data.lastName > 30) {
    throw new Error("Last name should be between 3 to 30 characters");
  } else if (!validator.isEmail(data.emailId)) {
    throw new Error("Email is invalid");
  } else if (!validator.isStrongPassword(data.password)) {
    throw new Error("Password is weak");
  }
};

const profileUpdateValidation = (req) => {
  const isValidate = Object.keys(req.body).every((update) =>
    ["firstName", "lastName", "age", "skills", "bio"].includes(update)
  );

  return isValidate;
};

module.exports = { UserValidate, profileUpdateValidation };
