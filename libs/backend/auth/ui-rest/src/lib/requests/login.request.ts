import { IsNotEmpty } from 'class-validator';

export class LoginRequest {
  @IsNotEmpty()
  token: string;
}
