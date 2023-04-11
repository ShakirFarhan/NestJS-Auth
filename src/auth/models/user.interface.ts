import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class userInterface {
  @IsNotEmpty()
  @IsString()
  first_name: string;
  @IsNotEmpty()
  @IsString()
  last_name: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
export class signInInterface {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
