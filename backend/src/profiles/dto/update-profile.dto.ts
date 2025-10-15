import { IsEnum, IsOptional } from 'class-validator';
import { Goal, ActivityLevel } from '../../entities/profile.entity';

export class UpdateProfileDto {
  @IsOptional()
  @IsEnum(Goal)
  goal?: Goal;

  @IsOptional()
  @IsEnum(ActivityLevel)
  activityLevel?: ActivityLevel;
}
