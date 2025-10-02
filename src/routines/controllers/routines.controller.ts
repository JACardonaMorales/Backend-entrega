import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { RoutinesService } from '../services/routines.service';
import { CreateRoutineDto } from '../dto/create-routine.dto';
import { UpdateRoutineDto } from '../dto/update-routine.dto';
import { AddExerciseToRoutineDto } from '../dto/add-exercise-to-routine.dto';

@Controller('routines')
export class RoutinesController {
  constructor(private readonly routinesService: RoutinesService) {}

  @Post()
  create(@Body() createRoutineDto: CreateRoutineDto) {
    return this.routinesService.create(createRoutineDto);
  }

  @Get()
  findAll(
    @Query('dayOfWeek') dayOfWeek?: string,
    @Query('completed') completed?: string,
    @Query('userId') userId?: string,
  ) {
    const filters: any = {};
    
    if (dayOfWeek) filters.dayOfWeek = dayOfWeek;
    if (completed !== undefined) filters.completed = completed === 'true';
    if (userId) filters.userId = parseInt(userId);

    return this.routinesService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.routinesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoutineDto: UpdateRoutineDto,
  ) {
    return this.routinesService.update(id, updateRoutineDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.routinesService.remove(id);
  }

  @Patch(':id/complete')
  markAsComplete(@Param('id', ParseIntPipe) id: number) {
    return this.routinesService.markAsComplete(id);
  }

  @Post(':routineId/exercises')
  addExerciseToRoutine(
    @Param('routineId', ParseIntPipe) routineId: number,
    @Body() addExerciseDto: AddExerciseToRoutineDto,
  ) {
    return this.routinesService.addExerciseToRoutine(routineId, addExerciseDto);
  }

  @Delete(':routineId/exercises/:exerciseId')
  removeExerciseFromRoutine(
    @Param('routineId', ParseIntPipe) routineId: number,
    @Param('exerciseId', ParseIntPipe) exerciseId: number,
  ) {
    return this.routinesService.removeExerciseFromRoutine(routineId, exerciseId);
  }
}
