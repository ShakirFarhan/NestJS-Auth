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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const models_1 = require("../auth/models");
let UserService = class UserService {
    constructor(userRepo, connection) {
        this.userRepo = userRepo;
        this.connection = connection;
    }
    getQuery(data) {
        const { tablename, fields } = data;
        const tablesValid = ['users'];
        const columnsvalid = [
            'first_name',
            'last_name',
            'createdAt',
            'email',
            'id',
        ];
        if (!tablesValid.includes(tablename)) {
            throw new common_1.NotFoundException('Table Not Found!');
        }
        if (!fields.every((e) => columnsvalid.includes(e))) {
            throw new common_1.NotFoundException('Enter Valid Fields');
        }
        return this.connection.query(`SELECT ${fields.join(',')} FROM ${tablename}`);
    }
    async getFiltered(data) {
        const { email, first_name, last_name, tablename } = data;
        const tablesValid = ['users'];
        if (!tablesValid.includes(tablename)) {
            throw new common_1.NotFoundException('Table Not Found!');
        }
        let query = `SELECT * FROM ${tablename}`;
        let filters = [];
        if (email) {
            filters.push(`'email'='${email}'`);
        }
        if (first_name) {
            filters.push(`first_name='${first_name}'`);
        }
        if (last_name) {
            filters.push(`last_name='${last_name}'`);
        }
        if (filters.length > 0) {
            query += ` WHERE ${filters.join(' AND ')}`;
        }
        const response = await this.connection.query(query);
        if ((await response).length > 0) {
            return response;
        }
        else {
            return {
                message: 'No Data Available',
            };
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(models_1.userEntity)),
    __param(1, (0, typeorm_2.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.DataSource])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map