import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { RoutinesModule } from './routines/routines.module';
import { ExercisesModule } from './exercises/exercises.module';
import { SeedsModule } from './database/seeds/seeds.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    UsersModule,
    ProfilesModule,
    RoutinesModule,
    ExercisesModule,
    SeedsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
