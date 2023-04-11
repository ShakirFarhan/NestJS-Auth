import { IsEmail } from 'class-validator';

export interface filterDto {
  email?: string;
  first_name?: string;
  last_name?: string;
  tablename?: string;
}
export interface recordsDto {
  tablename: string;
  fields: Array<string>;
}
