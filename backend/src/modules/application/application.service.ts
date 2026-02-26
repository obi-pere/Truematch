import type { Application, User } from '@prisma/client';
import { prisma } from '../../config/prisma';
import { AppError } from '../../utils/app-error';
import { hashPassword } from '../../utils/hash';
import { signAccessToken, signRefreshToken } from '../../utils/jwt';
import type { SubmitApplicationDto } from './application.validation';

type SanitizedUser = Omit<User, 'password'>;
type ApplicationResult = {
  user: SanitizedUser;
  application: Application;
  accessToken: string;
  refreshToken: string;
};

const sanitizeUser = (user: User): SanitizedUser => {
  const { password: _password, ...safeUser } = user;
  return safeUser;
};

export const submitApplication = async (payload: SubmitApplicationDto): Promise<ApplicationResult> => {
  const existing = await prisma.user.findUnique({ where: { email: payload.email } });
  if (existing) {
    throw new AppError(409, 'Email already exists');
  }

  const hashedPassword = await hashPassword(payload.password);

  const { user, application } = await prisma.$transaction(async (tx) => {
    const createdUser = await tx.user.create({
      data: {
        fullName: payload.fullName,
        email: payload.email,
        password: hashedPassword,
        role: 'USER'
      }
    });

    const createdApplication = await tx.application.create({
      data: {
        userId: createdUser.id,
        status: 'SUBMITTED'
      }
    });

    return {
      user: createdUser,
      application: createdApplication
    };
  });

  const jwtPayload = { userId: user.id, email: user.email, role: user.role };

  return {
    user: sanitizeUser(user),
    application,
    accessToken: signAccessToken(jwtPayload),
    refreshToken: signRefreshToken(jwtPayload)
  };
};
