import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutinesService } from './services/routines.service';
import { RoutinesController } from './controllers/routines.controller';
import { WeeklyRoutine } from '../entities/weekly-routine.entity';
import { User } from '../entities/user.entity';
import { Exercise } from '../entities/exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WeeklyRoutine, User, Exercise])],
  controllers: [RoutinesController],
  providers: [RoutinesService],
  exports: [RoutinesService],
})
export class RoutinesModule {}
