import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class userEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
