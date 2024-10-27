// src/types/authenticated-request.ts
import { Request } from 'express';
import { User } from '../user/entities/user.entity';  // Adjust the path as necessary

export interface AuthenticatedRequest extends Request {
  user: User;  // Add the `user` object to the request
}
