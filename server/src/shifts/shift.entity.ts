import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Activity, IShift } from './shifts.types';
import { User } from '@/auth/user.entity';

@Entity()
export class Shift implements IShift {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  start: Date | null;

  @Column()
  end: Date | null;

  @Column()
  user_id: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  activity: Activity;

  // ManyToOne relationship to link back to User
  @ManyToOne(() => User, (user) => user.shifts)
  @JoinColumn({ name: 'user_id' }) // Specify the join column in the Shift table
  user: User;
}
