import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ID } from '../../../database/types';
import { Exclude } from 'class-transformer';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone?: number;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true })
  password?: string;

  @Column({ default: false })
  isAdmin!: boolean;

  //failed login check?

  @Column({ nullable: true })
  failedLoginTimes?: number;

  @Column({ name: 'last_failed_attempt', type: 'varchar', nullable: true })
  lastFailedAttempt?: string;

  //reset password token
  @Column({ nullable: true })
  resetToken?: string;

  @Column({ nullable: true })
  resetTokenDate?: string;

  @Column({ nullable: true })
  reqInMinute?: number;

  @Column({ nullable: true })
  reqInDay?: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
