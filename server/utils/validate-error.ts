const checkValidateEmail = async (email: string) => {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return true;
  } else {
    return false;
  }
};

const checkValidatePassword = async (password: string) => {
  if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password)) {
    return true;
  } else {
    return false;
  }
};
module.exports = {
  checkValidateEmail,
  checkValidatePassword,
};
