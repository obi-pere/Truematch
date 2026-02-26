import type { Request, Response } from 'express';
import { AppError } from '../../utils/app-error';
import { getCurrentUser } from './user.service';

export const meHandler = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    throw new AppError(401, 'Unauthorized');
  }

  const user = await getCurrentUser(req.user.userId);

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  res.status(200).json({ user });
};
