import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUsersDto } from './dto/create-user.dto';
import { UpdateUsersDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
@Controller('users')
export class UsersControllerController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  /**
   *
   * @returns All the users
   */
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  /**
   *
   * @param id
   * @returns  One user
   */
  @Get(':id')
  findUserById(@Param('id') id: number) {
    console.log(typeof id, 'tipo del ID');
    return this.usersService.findUserById('' + id);
  }
  /**
   *
   * @param createUserDto
   * @returns
   */
  @Post()
  async newUser(@Body() createUserDto: CreateUsersDto) {
    console.log(createUserDto);
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    const userhash = {
      ...createUserDto,
      password: hashedPassword,
    };
    // const newUser = await this.usersService.newUser(userhash)

    return this.usersService.newUser(userhash);
  }

  @Post('login')
  async login(@Body() logingPayload) {
    const { email, password } = logingPayload;
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException(`invalid credentials`);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException(`invalid credentials`);
    }
    const payload = { id: user.id };
    const jwt = await this.jwtService.signAsync(payload);
    const userLogin = {
      ...user,
      token: jwt,
    };
    return userLogin;
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUsersDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUsers(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
