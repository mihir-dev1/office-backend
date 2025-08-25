import axios from "axios";
import { NextFunction, Request, Response } from 'express';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'Missing Authorization' });

  const token = header.replace(/^Bearer\s+/i, '');

  try {
    const response = await axios.post("http://localhost:5000/auth/api/v1/validate", { token });
    if (response.data.valid) {
      (req as any).user = response.data.decoded;
      return next();
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch (err: any) {
    console.error("Auth service error:", err.message);
    return res.status(401).json({ message: "Auth service error", error: err.message });
  }
};
