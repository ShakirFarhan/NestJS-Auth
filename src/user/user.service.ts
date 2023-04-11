import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { userEntity } from 'src/auth/models';
import { filterDto, recordsDto } from './dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(userEntity)
    private readonly userRepo: Repository<userEntity>,
    @InjectDataSource() private readonly connection: DataSource,
  ) {}
  getQuery(data: recordsDto) {
    const { tablename, fields } = data;
    const tablesValid: Array<string> = ['users'];
    const columnsvalid = [
      'first_name',
      'last_name',
      'createdAt',
      'email',
      'id',
    ];
    if (!tablesValid.includes(tablename)) {
      throw new NotFoundException('Table Not Found!');
    }
    if (!fields.every((e) => columnsvalid.includes(e))) {
      throw new NotFoundException('Enter Valid Fields');
    }
    return this.connection.query(
      `SELECT ${fields.join(',')} FROM ${tablename}`,
    );
  }

  async getFiltered(data: filterDto) {
    const { email, first_name, last_name, tablename } = data;

    const tablesValid: Array<string> = ['users'];
    if (!tablesValid.includes(tablename)) {
      throw new NotFoundException('Table Not Found!');
    }
    let query: string = `SELECT * FROM ${tablename}`;
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
    const response: Promise<Array<userEntity>> = await this.connection.query(
      query,
    );

    if ((await response).length > 0) {
      return response;
    } else {
      return {
        message: 'No Data Available',
      };
    }
  }
}
