import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/apiError';
import { ZodError } from 'zod';

export function notFound(req: Request, res: Response) {
  res.status(404).json({ message: 'Not Found' });
}

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: 'Validation failed', errors: err.issues });
  }
  const status = err instanceof ApiError ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';
  if (process.env.NODE_ENV !== 'test') console.error(err);
  res.status(status).json({ message });
}
