import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  password: string; // Will be used for Email/Password authentication

  @Column({ nullable: true })
  googleId: string; // Will be used for Google OAuth

  @Column({ default: 'user' })
  role: string; // Can be 'user' or 'admin'
}
