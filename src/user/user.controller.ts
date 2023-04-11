import { Body, Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/auth.decorators';
import { filterDto, recordsDto } from './dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { userEntity } from 'src/auth/models';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    @InjectDataSource() private readonly connection: DataSource,
  ) {}
  // @Get('/')
  // getMsg(@GetUser() user: any) {
  //   return user;
  // }
  @Get('/records')
  getQuery(@Body() data: recordsDto): Promise<Array<Object>> {
    return this.userService.getQuery(data);
  }

  @Get('/filters?')
  getFilteredData(
    @Query() data: filterDto,
  ): Promise<userEntity[] | { message: string }> {
    return this.userService.getFiltered(data);
  }
}
