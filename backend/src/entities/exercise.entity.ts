import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { WeeklyRoutine } from './weekly-routine.entity';

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  reps: string;

  @Column({ nullable: true })
  videoUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => WeeklyRoutine, weeklyRoutine => weeklyRoutine.exercises)
  weeklyRoutines: WeeklyRoutine[];
}
