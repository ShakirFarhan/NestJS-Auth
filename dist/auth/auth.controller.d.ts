import { AuthService } from './auth.service';
import { signInInterface, userInterface } from './models/user.interface';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(body: userInterface): Promise<{
        token: string;
    } | 'Something Went Wrong'>;
    signin(body: signInInterface): Promise<{
        token: string;
    } | {
        error: any;
    }>;
}
