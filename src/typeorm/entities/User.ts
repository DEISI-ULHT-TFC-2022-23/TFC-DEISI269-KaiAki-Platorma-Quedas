import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./Profile";

@Entity({name: 'users'})
export class User {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', unique: true , nullable: true})
  username: string;

  @Column({ type: 'varchar', nullable: true})
  password: string;  

  @Column({ type: 'datetime' })
  data_criacao: Date;


  @Column({nullable: true})
  authStrategy: string;

  @OneToOne(() => Profile )
    @JoinColumn()
    profile: Profile

}