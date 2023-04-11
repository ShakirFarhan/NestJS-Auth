import { UserService } from './user.service';
import { filterDto, recordsDto } from './dto';
import { DataSource } from 'typeorm';
import { userEntity } from 'src/auth/models';
export declare class UserController {
    private userService;
    private readonly connection;
    constructor(userService: UserService, connection: DataSource);
    getQuery(data: recordsDto): Promise<Array<Object>>;
    getFilteredData(data: filterDto): Promise<userEntity[] | {
        message: string;
    }>;
}
