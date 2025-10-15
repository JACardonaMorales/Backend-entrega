import { IsEnum, IsOptional, IsString, IsBoolean } from 'class-validator';
import { DayOfWeek } from '../../entities/weekly-routine.entity';

export class UpdateRoutineDto {
  @IsOptional()
  @IsEnum(DayOfWeek)
  dayOfWeek?: DayOfWeek;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @IsOptional()
  @IsString()
  notes?: string;
}
