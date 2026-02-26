export type UserRole = 'USER' | 'ADMIN';

export type User = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};
