import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { UsersControllerController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: 'secretWord',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UsersControllerController],
  providers: [UsersService],
})
export class UsersModule {}
