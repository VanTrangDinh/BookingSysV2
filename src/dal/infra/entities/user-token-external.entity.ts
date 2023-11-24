import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

export enum AuthProviderEnum {
  GOOGLE = 'google',
  GITHUB = 'github',
  FACEBOOK = 'facebook',
}

@Entity('user_token_external')
export class UserTokenExternalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  providerId: string;

  @Column({ type: 'enum', enum: AuthProviderEnum })
  provider: AuthProviderEnum;

  @Column({ type: 'varchar', length: 255, nullable: true })
  accessToken: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  refreshToken: string;

  @Column({ type: 'boolean' })
  valid: boolean;

  @Column({ type: 'varchar', nullable: true })
  username: string;

  @ManyToOne(() => UserEntity, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  user!: UserEntity;
}
