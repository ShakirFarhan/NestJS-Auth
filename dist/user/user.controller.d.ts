import { UserService } from './user.service';
import { filterDto, recordsDto } from './dto';
import { DataSource } from 'typeorm';
export declare class UserController {
    private userService;
    private readonly connection;
    constructor(userService: UserService, connection: DataSource);
    getQuery(data: recordsDto): Promise<any>;
    getFilteredData(data: filterDto): Promise<import("../auth/models").userEntity[] | {
        message: string;
    }>;
}
