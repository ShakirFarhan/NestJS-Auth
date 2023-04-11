import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { signInInterface, userEntity } from './models';
import { Repository } from 'typeorm';
import { userInterface } from './models';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(userEntity)
    private readonly userRepo: Repository<userEntity>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(
    body: userInterface,
  ): Promise<{ token: string } | 'Something Went Wrong'> {
    const hash: string = await argon.hash(body.password);
    try {
      const user: userEntity = await this.userRepo.save({
        ...body,
        password: hash,
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      console.log(error.message);
      return 'Something Went Wrong';
    }
  }
  async signin(
    body: signInInterface,
  ): Promise<{ token: string } | { error: any }> {
    try {
      const user: userEntity = await this.userRepo.findOne({
        where: {
          email: body.email,
        },
      });
      if (!user) {
        throw new ForbiddenException('No User With This Email');
      }
      const passMatches: boolean = await argon.verify(
        user.password,
        body.password,
      );
      if (!passMatches) throw new ForbiddenException('Incorrect Credentials');
      return this.signToken(user.id, user.email);
    } catch (error) {
      return { error: error.message };
    }
  }
  async signToken(id: number, email: string): Promise<{ token: string }> {
    const payload = {
      sub: id,
      email,
    };
    const secret: string = this.config.get('SECRET_KEY');
    const token: string = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
    return {
      token: token,
    };
  }
}
