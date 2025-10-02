import { IsString, IsOptional } from 'class-validator';

export class UpdateExerciseDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  reps?: string;

  @IsOptional()
  @IsString()
  videoUrl?: string;
}
