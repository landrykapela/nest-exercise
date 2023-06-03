import { ResponseError } from 'src/app.interface';
import { AuthResponseData } from '../auth.interface';

export class ResponseAuthDto {
  status: number;
  message: string;
  data?: AuthResponseData;
  error?: ResponseError;
}
