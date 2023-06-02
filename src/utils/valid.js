import { EMAIL_REGEX, PASSWORD_REGEX } from '@constants';

export const isValid = {
  email: (value) => EMAIL_REGEX.test(value),
  password: (value) => PASSWORD_REGEX.test(value),
};
