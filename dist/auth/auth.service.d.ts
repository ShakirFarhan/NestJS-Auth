import { signInInterface, userEntity } from './models';
import { Repository } from 'typeorm';
import { userInterface } from './models';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly userRepo;
    private jwt;
    private config;
    constructor(userRepo: Repository<userEntity>, jwt: JwtService, config: ConfigService);
    signup(body: userInterface): Promise<{
        token: string;
    } | 'Something Went Wrong'>;
    signin(body: signInInterface): Promise<{
        token: string;
    } | {
        error: any;
    }>;
    signToken(id: number, email: string): Promise<{
        token: string;
    }>;
}
