import { User } from 'src/users/entity/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User)
  @JoinColumn(
    [{
      name: 'email',
      referencedColumnName: 'email'
    }]
  )
  user: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  time: string;

  @Column()
  title: string;

  @Column()
  content: string;

}