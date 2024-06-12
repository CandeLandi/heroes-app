import { User } from "./user.interface";

export interface LoginResponse {
  id: string;
  user: User;
  username: string;
  token: string;
}
