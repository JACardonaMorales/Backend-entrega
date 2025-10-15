import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { SeedService } from './seed.service';

async function runSeeds() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedService = app.get(SeedService);
  
  try {
    console.log('🌱 Starting database seeding...');
    
    await seedService.seedUsers();
    await seedService.seedProfiles();
    await seedService.seedExercises();
    await seedService.seedWeeklyRoutines();
    
    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } finally {
    await app.close();
  }
}

runSeeds();
