import { DataSource, Repository } from 'typeorm';
import { userEntity } from 'src/auth/models';
import { filterDto, recordsDto } from './dto';
export declare class UserService {
    private readonly userRepo;
    private readonly connection;
    constructor(userRepo: Repository<userEntity>, connection: DataSource);
    getQuery(data: recordsDto): Promise<any>;
    getFiltered(data: filterDto): Promise<userEntity[] | {
        message: string;
    }>;
}
