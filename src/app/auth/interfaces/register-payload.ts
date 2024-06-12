import { User } from './user.interface';
import { identity } from 'rxjs';

export interface RegisterPayload {
  user: User;
  token: string;
}
