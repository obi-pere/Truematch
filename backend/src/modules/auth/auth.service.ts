import type { User } from '@prisma/client';
import { prisma } from '../../config/prisma';
import { AppError } from '../../utils/app-error';
import { comparePassword, hashPassword } from '../../utils/hash';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../utils/jwt';
import type { LoginDto, RegisterDto } from './auth.validation';

type SanitizedUser = Omit<User, 'password'>;

type AuthResponse = {
  user: SanitizedUser;
  accessToken: string;
  refreshToken: string;
};

const sanitizeUser = (user: User): SanitizedUser => {
  const { password: _password, ...safeUser } = user;
  return safeUser;
};

export const register = async (payload: RegisterDto): Promise<AuthResponse> => {
  const existing = await prisma.user.findUnique({ where: { email: payload.email } });
  if (existing) {
    throw new AppError(409, 'Email already exists');
  }

  const hashedPassword = await hashPassword(payload.password);

  const user = await prisma.user.create({
    data: {
      fullName: payload.fullName,
      email: payload.email,
      password: hashedPassword,
      role: 'USER'
    }
  });

  const jwtPayload = { userId: user.id, email: user.email, role: user.role };

  return {
    user: sanitizeUser(user),
    accessToken: signAccessToken(jwtPayload),
    refreshToken: signRefreshToken(jwtPayload)
  };
};

export const login = async (payload: LoginDto): Promise<AuthResponse> => {
  const user = await prisma.user.findUnique({ where: { email: payload.email } });

  if (!user) {
    throw new AppError(401, 'Invalid credentials');
  }

  const validPassword = await comparePassword(payload.password, user.password);
  if (!validPassword) {
    throw new AppError(401, 'Invalid credentials');
  }

  const jwtPayload = { userId: user.id, email: user.email, role: user.role };

  return {
    user: sanitizeUser(user),
    accessToken: signAccessToken(jwtPayload),
    refreshToken: signRefreshToken(jwtPayload)
  };
};

export const refreshAuth = async (refreshToken: string): Promise<AuthResponse> => {
  const payload = verifyRefreshToken(refreshToken);
  const user = await prisma.user.findUnique({ where: { id: payload.userId } });

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  const jwtPayload = { userId: user.id, email: user.email, role: user.role };

  return {
    user: sanitizeUser(user),
    accessToken: signAccessToken(jwtPayload),
    refreshToken: signRefreshToken(jwtPayload)
  };
};
