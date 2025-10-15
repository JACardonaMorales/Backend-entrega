import { IsEnum, IsOptional, IsString, IsNumber } from 'class-validator';
import { DayOfWeek } from '../../entities/weekly-routine.entity';

export class CreateRoutineDto {
  @IsEnum(DayOfWeek)
  dayOfWeek: DayOfWeek;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsNumber()
  userId: number;
}
