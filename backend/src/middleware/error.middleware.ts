import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/app-error';
import { ZodError } from 'zod';

export const errorMiddleware = (error: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }

  if (error instanceof ZodError) {
    res.status(400).json({
      message: 'Validation error',
      errors: error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message
      }))
    });
    return;
  }

  if (error instanceof Error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }

  res.status(500).json({ message: 'Internal server error' });
};
