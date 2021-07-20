import { CreateUsersDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
export class UpdateUsersDto extends PartialType(CreateUsersDto) {}
