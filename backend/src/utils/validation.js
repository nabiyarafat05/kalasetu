const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const normalizePhone = (value = '') => {
  const input = String(value).trim().replace(/[\s()-]/g, '');
  const digits = input.startsWith('+91') ? input.slice(3) : input;
  return /^\d+$/.test(digits) ? digits : '';
};

const isValidPhone = (value) => {
  const digits = normalizePhone(value);
  return /^[6-9]\d{9}$/.test(digits) && !/^([0-9])\1{9}$/.test(digits) && digits !== '9876543210';
};

const isValidEmail = (value) => EMAIL_PATTERN.test(String(value || '').trim());

const isValidName = (value, minLength = 2, maxLength = 100) => {
  const name = String(value || '').trim();
  return name.length >= minLength && name.length <= maxLength && !/^\d+$/.test(name);
};

const isPositiveNumber = (value) => Number.isFinite(Number(value)) && Number(value) > 0;
const isPositiveInteger = (value) => Number.isInteger(Number(value)) && Number(value) > 0;

const validateProduct = ({ name, description, price }) => {
  const errors = [];
  if (!isValidName(name, 3, 150)) errors.push('Product name must be 3-150 characters.');
  const descriptionLength = String(description || '').trim().length;
  if (descriptionLength < 10 || descriptionLength > 5000) errors.push('Description must be 10-5000 characters.');
  if (!isPositiveNumber(price)) errors.push('Please enter a valid positive price.');
  return errors;
};

const validateAddress = (address = {}) => {
  const errors = [];
  if (!isValidName(address.fullName)) errors.push('Please enter a valid recipient name.');
  if (!isValidPhone(address.phone)) errors.push('Please enter a valid 10-digit mobile number.');
  for (const field of ['street', 'city', 'state', 'postalCode']) {
    if (!String(address[field] || '').trim()) errors.push('Complete shipping address is required.');
  }
  if (address.postalCode && !/^\d{6}$/.test(String(address.postalCode).trim())) errors.push('Please enter a valid 6-digit PIN code.');
  return errors;
};

module.exports = {
  normalizePhone,
  isValidPhone,
  isValidEmail,
  isValidName,
  isPositiveNumber,
  isPositiveInteger,
  validateProduct,
  validateAddress
};