import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler';
import { submitApplicationHandler } from './application.controller';

export const applicationRouter = Router();

applicationRouter.post('/', asyncHandler(submitApplicationHandler));
