
import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import env from '../config/env';

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.string().optional()
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })
});

export const validators = { registerSchema, loginSchema };

function signToken(user: { id: string; email: string; role: string }) {
  return jwt.sign({ sub: user.id, email: user.email, role: user.role }, env.JWT_SECRET as string, {
    expiresIn: env.JWT_EXPIRES_IN || '1d'
  });
}

export async function verifyAccessToken(req: Request, res: Response) {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET as string);
    return res.json({ valid: true, decoded });
  } catch (err) {
    return res.status(401).json({ valid: false, message: 'Invalid token' });
  }
}

export async function register(req: Request, res: Response) {
  const { name, email, password, role } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Email already exists' });
  const user = await User.create({ name, email, password, role: role || 'user' });
  const token = signToken({ id: user.id, email: user.email, role: user.role });
  res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role }, message:'Register Successful' });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  // @ts-ignore
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const token = signToken({ id: user.id, email: user.email, role: user.role });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role },message:'Register Successful' });
}

export async function listUsers(req: Request, res: Response) {
  try {
    // fetch all users but exclude password
    const users = await User.find().select("-password");

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({
      message: "User list fetched successfully",
      users
    });
  } catch (error: any) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export async function me(req: Request, res: Response) {
  // @ts-ignore
  res.json({ user: req.user });
}
