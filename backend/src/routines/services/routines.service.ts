import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeeklyRoutine } from '../../entities/weekly-routine.entity';
import { User } from '../../entities/user.entity';
import { Exercise } from '../../entities/exercise.entity';
import { CreateRoutineDto } from '../dto/create-routine.dto';
import { UpdateRoutineDto } from '../dto/update-routine.dto';
import { AddExerciseToRoutineDto } from '../dto/add-exercise-to-routine.dto';

@Injectable()
export class RoutinesService {
  constructor(
    @InjectRepository(WeeklyRoutine)
    private routinesRepository: Repository<WeeklyRoutine>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Exercise)
    private exercisesRepository: Repository<Exercise>,
  ) {}

  async create(createRoutineDto: CreateRoutineDto): Promise<WeeklyRoutine> {
    const user = await this.usersRepository.findOne({
      where: { id: createRoutineDto.userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${createRoutineDto.userId} not found`);
    }

    const routine = this.routinesRepository.create({
      ...createRoutineDto,
    });

    return this.routinesRepository.save(routine);
  }

  async findAll(filters?: {
    dayOfWeek?: string;
    completed?: boolean;
    userId?: number;
  }): Promise<WeeklyRoutine[]> {
    const queryBuilder = this.routinesRepository
      .createQueryBuilder('routine')
      .leftJoinAndSelect('routine.user', 'user')
      .leftJoinAndSelect('routine.exercises', 'exercises');

    if (filters?.dayOfWeek) {
      queryBuilder.andWhere('routine.dayOfWeek = :dayOfWeek', {
        dayOfWeek: filters.dayOfWeek,
      });
    }

    if (filters?.completed !== undefined) {
      queryBuilder.andWhere('routine.completed = :completed', {
        completed: filters.completed,
      });
    }

    if (filters?.userId) {
      queryBuilder.andWhere('routine.userId = :userId', { userId: filters.userId });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: number): Promise<WeeklyRoutine> {
    const routine = await this.routinesRepository.findOne({
      where: { id },
      relations: ['user', 'exercises'],
    });

    if (!routine) {
      throw new NotFoundException(`Routine with ID ${id} not found`);
    }

    return routine;
  }

  async update(id: number, updateRoutineDto: UpdateRoutineDto): Promise<WeeklyRoutine> {
    const routine = await this.findOne(id);
    Object.assign(routine, updateRoutineDto);
    return this.routinesRepository.save(routine);
  }

  async remove(id: number): Promise<void> {
    const routine = await this.findOne(id);
    await this.routinesRepository.remove(routine);
  }

  async markAsComplete(id: number): Promise<WeeklyRoutine> {
    const routine = await this.findOne(id);
    routine.completed = true;
    return this.routinesRepository.save(routine);
  }

  async addExerciseToRoutine(
    routineId: number,
    addExerciseDto: AddExerciseToRoutineDto,
  ): Promise<WeeklyRoutine> {
    const routine = await this.findOne(routineId);
    const exercise = await this.exercisesRepository.findOne({
      where: { id: addExerciseDto.exerciseId },
    });

    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${addExerciseDto.exerciseId} not found`);
    }

    // Add the exercise to the routine's exercises array if not already present
    if (!routine.exercises.some(ex => ex.id === exercise.id)) {
      routine.exercises.push(exercise);
      await this.routinesRepository.save(routine);
    }

    return this.findOne(routineId);
  }

  async removeExerciseFromRoutine(
    routineId: number,
    exerciseId: number,
  ): Promise<WeeklyRoutine> {
    const routine = await this.findOne(routineId);
    
    // Remove the exercise from the routine's exercises array
    routine.exercises = routine.exercises.filter(exercise => exercise.id !== exerciseId);
    
    return this.routinesRepository.save(routine);
  }
}
