import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IUser } from './auth.types';
import { Shift } from '@/shifts/shift.entity';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  natid: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // OneToMany relationship with Shift
  @OneToMany(() => Shift, (shift) => shift.user)
  shifts: Shift[];
}
