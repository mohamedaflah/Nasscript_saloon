import jwt from "jsonwebtoken";

export const generateJWT = (payload: any): string => {
  const token = jwt.sign(payload, "secret", { expiresIn: "20d" });
  return token;
};
