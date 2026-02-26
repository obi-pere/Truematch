import type { User } from '../types/user';
import { api } from './api';

export type SubmitApplicationPayload = {
  fullName: string;
  email: string;
  password: string;
};

type SubmitApplicationResponse = {
  message: string;
  user: User;
  application: {
    id: string;
    userId: string;
    status: 'SUBMITTED';
    createdAt: string;
    updatedAt: string;
  };
};

export const applicationService = {
  async submit(payload: SubmitApplicationPayload): Promise<User> {
    const response = await api.post<SubmitApplicationResponse>('/applications', payload);
    return response.data.user;
  }
};
