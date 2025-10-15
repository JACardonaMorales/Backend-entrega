import { IsString, IsOptional } from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  name: string;

  @IsString()
  reps: string;

  @IsOptional()
  @IsString()
  videoUrl?: string;
}
