import { UserData } from '../user/user.interface';

export interface AuthResponseData {
  user: UserData;
  accessToken: string;
}
