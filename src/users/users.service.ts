import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create-user.dto';
import { UpdateUsersDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  async findUserById(id: string) {
    const user = this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    return user;
  }

  async findUserByEmail(email: string) {
    const user = this.userRepository.findOne({ where: { email } });
    return user;
  }

  newUser(createUser: CreateUsersDto) {
    const user = this.userRepository.create(createUser);
    console.log(user, 'promesa??');
    const newUser = this.userRepository.save(user).catch((error) => {
      console.log(error, 'error backend');
      return new BadRequestException(`${error.message}`);
    });

    // return this.userRepository.save(user);s
    return newUser;
  }

  async updateUser(id: string, updateUserDto: UpdateUsersDto) {
    const user = await this.userRepository.preload({
      id: +id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    return this.userRepository.save(user);
  }

  async deleteUser(id: string) {
    const user = await this.findUserById(id);
    return this.userRepository.remove(user);
  }
}
