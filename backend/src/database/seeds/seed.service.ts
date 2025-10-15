import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Profile, Goal, ActivityLevel } from '../../entities/profile.entity';
import { Exercise } from '../../entities/exercise.entity';
import { WeeklyRoutine, DayOfWeek } from '../../entities/weekly-routine.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,
    @InjectRepository(Exercise)
    private exercisesRepository: Repository<Exercise>,
    @InjectRepository(WeeklyRoutine)
    private routinesRepository: Repository<WeeklyRoutine>,
  ) {}

  async seedUsers() {
    console.log('👤 Seeding users...');
    
    const users = [
      {
        name: 'Juan Pérez',
        email: 'juan.perez@email.com',
        password: 'password123',
        age: 28,
        weight: 75.5,
        height: 175,
      },
      {
        name: 'María García',
        email: 'maria.garcia@email.com',
        password: 'password123',
        age: 32,
        weight: 65.0,
        height: 165,
      },
      {
        name: 'Carlos López',
        email: 'carlos.lopez@email.com',
        password: 'password123',
        age: 25,
        weight: 80.0,
        height: 180,
      },
    ];

    for (const userData of users) {
      const existingUser = await this.usersRepository.findOne({
        where: { email: userData.email },
      });

      if (!existingUser) {
        const user = this.usersRepository.create(userData);
        await this.usersRepository.save(user);
        console.log(`✅ Created user: ${userData.name}`);
      } else {
        console.log(`⏭️  User already exists: ${userData.name}`);
      }
    }
  }

  async seedProfiles() {
    console.log('👥 Seeding profiles...');
    
    const users = await this.usersRepository.find();
    
    for (const user of users) {
      const existingProfile = await this.profilesRepository.findOne({
        where: { userId: user.id },
      });

      if (!existingProfile) {
        const profile = this.profilesRepository.create({
          goal: Goal.GAIN_MUSCLE,
          activityLevel: ActivityLevel.MODERATE,
          userId: user.id,
        });
        await this.profilesRepository.save(profile);
        console.log(`✅ Created profile for user: ${user.name}`);
      } else {
        console.log(`⏭️  Profile already exists for user: ${user.name}`);
      }
    }
  }

  async seedExercises() {
    console.log('💪 Seeding exercises...');
    
    const exercises = [
      {
        name: 'Sentadilla con Barra',
        reps: '3 series de 8-12 repeticiones',
        videoUrl: 'https://example.com/videos/squat.mp4',
      },
      {
        name: 'Press de Banca',
        reps: '4 series de 6-10 repeticiones',
        videoUrl: 'https://example.com/videos/bench-press.mp4',
      },
      {
        name: 'Dominadas',
        reps: '3 series hasta el fallo',
        videoUrl: 'https://example.com/videos/pull-ups.mp4',
      },
      {
        name: 'Plancha',
        reps: '3 series de 30-60 segundos',
        videoUrl: 'https://example.com/videos/plank.mp4',
      },
      {
        name: 'Burpees',
        reps: '3 series de 10-15 repeticiones',
        videoUrl: 'https://example.com/videos/burpees.mp4',
      },
      {
        name: 'Flexiones',
        reps: '3 series de 12-20 repeticiones',
        videoUrl: 'https://example.com/videos/push-ups.mp4',
      },
    ];

    for (const exerciseData of exercises) {
      const existingExercise = await this.exercisesRepository.findOne({
        where: { name: exerciseData.name },
      });

      if (!existingExercise) {
        const exercise = this.exercisesRepository.create(exerciseData);
        await this.exercisesRepository.save(exercise);
        console.log(`✅ Created exercise: ${exerciseData.name}`);
      } else {
        console.log(`⏭️  Exercise already exists: ${exerciseData.name}`);
      }
    }
  }

  async seedWeeklyRoutines() {
    console.log('📅 Seeding weekly routines...');
    
    const users = await this.usersRepository.find();
    const exercises = await this.exercisesRepository.find();

    for (const user of users) {
      // Crear rutinas para diferentes días
      const days = [DayOfWeek.MONDAY, DayOfWeek.WEDNESDAY, DayOfWeek.FRIDAY];
      
      for (const day of days) {
        const existingRoutine = await this.routinesRepository.findOne({
          where: { userId: user.id, dayOfWeek: day },
        });

        if (!existingRoutine) {
          const routine = this.routinesRepository.create({
            dayOfWeek: day,
            completed: false,
            notes: `Rutina de ${day.toLowerCase()}`,
            userId: user.id,
          });

          const savedRoutine = await this.routinesRepository.save(routine);

          // Asignar algunos ejercicios aleatorios a cada rutina
          const randomExercises = exercises
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

          savedRoutine.exercises = randomExercises;
          await this.routinesRepository.save(savedRoutine);

          console.log(`✅ Created routine for ${user.name} on ${day}`);
        } else {
          console.log(`⏭️  Routine already exists for ${user.name} on ${day}`);
        }
      }
    }
  }
}
