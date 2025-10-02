import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExercisesService } from './services/exercises.service';
import { ExercisesController } from './controllers/exercises.controller';
import { Exercise } from '../entities/exercise.entity';
import { WeeklyRoutine } from '../entities/weekly-routine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise, WeeklyRoutine])],
  controllers: [ExercisesController],
  providers: [ExercisesService],
  exports: [ExercisesService],
})
export class ExercisesModule {}
