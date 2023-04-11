import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { userEntity } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    readonly config: ConfigService,
    @InjectRepository(userEntity) private userRepo: Repository<userEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('SECRET_KEY'),
    });
  }
  async validate(payload: { sub: number; email: string }): Promise<userEntity> {
    const user: userEntity = await this.userRepo.findOne({
      where: {
        email: payload.email,
      },
    });
    delete user.password;
    return user;
  }
}
