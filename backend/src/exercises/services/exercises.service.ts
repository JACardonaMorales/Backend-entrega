import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from '../../entities/exercise.entity';
import { WeeklyRoutine } from '../../entities/weekly-routine.entity';
import { CreateExerciseDto } from '../dto/create-exercise.dto';
import { UpdateExerciseDto } from '../dto/update-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private exercisesRepository: Repository<Exercise>,
    @InjectRepository(WeeklyRoutine)
    private routinesRepository: Repository<WeeklyRoutine>,
  ) {}

  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    const exercise = this.exercisesRepository.create(createExerciseDto);
    return this.exercisesRepository.save(exercise);
  }

  async findAll(): Promise<Exercise[]> {
    return this.exercisesRepository.find({
      relations: ['weeklyRoutines', 'weeklyRoutines.user'],
    });
  }

  async findOne(id: number): Promise<Exercise> {
    const exercise = await this.exercisesRepository.findOne({
      where: { id },
      relations: ['weeklyRoutines', 'weeklyRoutines.user'],
    });

    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }

    return exercise;
  }

  async update(id: number, updateExerciseDto: UpdateExerciseDto): Promise<Exercise> {
    const exercise = await this.findOne(id);
    Object.assign(exercise, updateExerciseDto);
    return this.exercisesRepository.save(exercise);
  }

  async remove(id: number): Promise<void> {
    const exercise = await this.findOne(id);
    await this.exercisesRepository.remove(exercise);
  }

  async findByRoutine(weeklyRoutineId: number): Promise<Exercise[]> {
    const routine = await this.routinesRepository.findOne({
      where: { id: weeklyRoutineId },
      relations: ['exercises'],
    });

    if (!routine) {
      throw new NotFoundException(`Routine with ID ${weeklyRoutineId} not found`);
    }

    return routine.exercises;
  }
}
