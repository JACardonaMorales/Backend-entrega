import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Exercise } from './exercise.entity';

export enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY'
}

@Entity('weekly_routines')
export class WeeklyRoutine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar'
  })
  dayOfWeek: DayOfWeek;

  @Column({ default: false })
  completed: boolean;

  @Column({ nullable: true })
  notes: string;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.weeklyRoutines)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Exercise, exercise => exercise.weeklyRoutines)
  @JoinTable({
    name: 'weekly_routine_exercises',
    joinColumn: { name: 'weeklyRoutineId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'exerciseId', referencedColumnName: 'id' }
  })
  exercises: Exercise[];
}
