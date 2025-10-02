import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { User } from '../entities/user.entity';
import { Profile } from '../entities/profile.entity';
import { WeeklyRoutine } from '../entities/weekly-routine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, WeeklyRoutine])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
