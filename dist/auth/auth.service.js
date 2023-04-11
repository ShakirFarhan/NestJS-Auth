"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const models_1 = require("./models");
const typeorm_2 = require("typeorm");
const argon = require("argon2");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(userRepo, jwt, config) {
        this.userRepo = userRepo;
        this.jwt = jwt;
        this.config = config;
    }
    async signup(body) {
        const hash = await argon.hash(body.password);
        try {
            const user = await this.userRepo.save(Object.assign(Object.assign({}, body), { password: hash }));
            return this.signToken(user.id, user.email);
        }
        catch (error) {
            console.log(error.message);
            return 'Something Went Wrong';
        }
    }
    async signin(body) {
        try {
            const user = await this.userRepo.findOne({
                where: {
                    email: body.email,
                },
            });
            if (!user) {
                throw new common_1.ForbiddenException('No User With This Email');
            }
            const passMatches = await argon.verify(user.password, body.password);
            if (!passMatches)
                throw new common_1.ForbiddenException('Incorrect Credentials');
            return this.signToken(user.id, user.email);
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async signToken(id, email) {
        const payload = {
            sub: id,
            email,
        };
        const secret = this.config.get('SECRET_KEY');
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret,
        });
        return {
            token: token,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(models_1.userEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map