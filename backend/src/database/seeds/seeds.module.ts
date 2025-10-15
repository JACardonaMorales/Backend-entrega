import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { User } from '../../entities/user.entity';
import { Profile } from '../../entities/profile.entity';
import { Exercise } from '../../entities/exercise.entity';
import { WeeklyRoutine } from '../../entities/weekly-routine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Exercise, WeeklyRoutine])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedsModule {}
