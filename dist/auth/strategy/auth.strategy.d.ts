import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { userEntity } from '../models';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    readonly config: ConfigService;
    private userRepo;
    constructor(config: ConfigService, userRepo: Repository<userEntity>);
    validate(payload: {
        sub: number;
        email: string;
    }): Promise<userEntity>;
}
export {};
