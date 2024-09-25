import bcrypt from "bcryptjs";
export const hashPassword = (pass: string): string => {
  return bcrypt.hashSync(pass, 10);
};
