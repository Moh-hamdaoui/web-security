import jwt from "jsonwebtoken";

export type AuthUser = {
  id: number;
  email: string;
  role: string;
  isAdmin: boolean;
};

const secret = process.env.JWT_SECRET || "garagehub-secret";

export function signToken(user: AuthUser) {
  return jwt.sign(user, secret, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, secret) as AuthUser;
}
