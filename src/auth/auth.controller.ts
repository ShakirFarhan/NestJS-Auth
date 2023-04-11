import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInInterface, userInterface } from './models/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signup(
    @Body() body: userInterface,
  ): Promise<{ token: string } | 'Something Went Wrong'> {
    return this.authService.signup(body);
  }
  @Post('/signin')
  signin(@Body() body: signInInterface): Promise<|{token: string}|{error: any}> {
    return this.authService.signin(body);
  }
}
