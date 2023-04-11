import { Body, Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/auth.decorators';
import { filterDto, recordsDto } from './dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

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
  getQuery(@Body() data: recordsDto) {
    return this.userService.getQuery(data);
  }

  @Get('/filters?')
  getFilteredData(@Query() data: filterDto) {
    return this.userService.getFiltered(data);
  }
}
