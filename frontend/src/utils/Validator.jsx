export const Validator = {
  // Check require value
  require(value, name) {
    if (value === undefined || value === null || value.toString().trim() === "") {
      return `${name} không được để trống`;
    }
    return null;
  },

  // Check maxlength value
  max(value, maxLength, name) {
    if (value && value.toString().length > maxLength) {
      return `${name} không được vượt quá ${maxLength} ký tự`;
    }
    return null;
  },

  // Check minlength
  min(value, minLength, name) {
    if (value && value.toString().length < minLength) {
      return `${name} phải có ít nhất ${minLength} ký tự`;
    }
    return null;
  },

  // Check value is number
  isNumber(value, name) {
    if (value && isNaN(value)) {
      return `${name} phải là số`;
    }
    return null;
  },

  // check value is email
  email(value, name) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !regex.test(value)) {
      return `${name} không hợp lệ`;
    }
    return null;
  },

  // Check pattern value
  pattern(value, regex,) {
    if (value && !regex.test(value)) {
      return `Giá trị không hợp lệ`;
    }
    return null;
  }
}
