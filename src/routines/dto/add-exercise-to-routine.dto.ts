import { IsNumber } from 'class-validator';

export class AddExerciseToRoutineDto {
  @IsNumber()
  exerciseId: number;
}
