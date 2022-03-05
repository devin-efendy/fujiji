// this eslint disable should be removed when we are adding more functions into validate.js

// eslint-disable-next-line import/prefer-default-export
export function validateEmail(email) {
  if (!email) return false;

  return email.match(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
}

export function validatePhoneNumber(phoneNumber) {
  if (!phoneNumber) return false;
  // eslint-disable-next-line no-useless-escape
  return phoneNumber.match(/^\d{10}$/);
}
