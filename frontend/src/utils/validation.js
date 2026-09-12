export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const normalizePhone = (value = '') => {
  const input = String(value).trim().replace(/[\s()-]/g, '');
  const digits = input.startsWith('+91') ? input.slice(3) : input;
  return /^\d+$/.test(digits) ? digits : '';
};

export const isValidPhone = (value) => {
  const digits = normalizePhone(value);
  return /^[6-9]\d{9}$/.test(digits) && !/^([0-9])\1{9}$/.test(digits) && digits !== '9876543210';
};

export const isValidEmail = (value) => emailPattern.test(String(value).trim());

export const isValidName = (value, minLength = 2, maxLength = 100) => {
  const name = String(value || '').trim();
  return name.length >= minLength && name.length <= maxLength && !/^\d+$/.test(name);
};

export const isPositiveNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) && number > 0;
};

export const isPositiveInteger = (value) => Number.isInteger(Number(value)) && Number(value) > 0;

export const validateProduct = ({ name, description, price }) => {
  const errors = {};
  const trimmedName = String(name || '').trim();
  const trimmedDescription = String(description || '').trim();
  if (trimmedName.length < 3 || trimmedName.length > 150) errors.name = 'Product name must be 3-150 characters.';
  if (trimmedDescription.length < 10 || trimmedDescription.length > 5000) errors.description = 'Description must be 10-5000 characters.';
  if (!isPositiveNumber(price)) errors.price = 'Please enter a valid positive price.';
  return errors;
};

export const validateAddress = (address) => {
  const errors = {};
  if (!isValidName(address.fullName)) errors.fullName = 'Please enter a valid recipient name.';
  if (!isValidPhone(address.phone)) errors.phone = 'Please enter a valid 10-digit mobile number.';
  for (const field of ['street', 'city', 'state', 'postalCode']) {
    if (!String(address[field] || '').trim()) errors[field] = 'This field is required.';
  }
  if (address.postalCode && !/^\d{6}$/.test(String(address.postalCode).trim())) errors.postalCode = 'Please enter a valid 6-digit PIN code.';
  return errors;
};