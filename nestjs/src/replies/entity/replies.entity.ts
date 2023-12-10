import { User } from 'src/users/entity/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Reply {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  time: string;

  @Column()
  content: string;

  @Column()
  boardId: number;
}