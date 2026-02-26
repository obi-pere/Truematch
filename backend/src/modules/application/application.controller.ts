import type { Request, Response } from 'express';
import { setAuthCookies } from '../../utils/jwt';
import { submitApplication } from './application.service';
import { submitApplicationSchema } from './application.validation';

export const submitApplicationHandler = async (req: Request, res: Response): Promise<void> => {
  const dto = submitApplicationSchema.parse(req.body);
  const result = await submitApplication(dto);

  setAuthCookies(res, result.accessToken, result.refreshToken);

  res.status(201).json({
    message: 'Application submitted successfully',
    user: result.user,
    application: result.application
  });
};
