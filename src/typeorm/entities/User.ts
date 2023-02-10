import { IsEmail } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./Profile";

@Entity({ name: 'users' })
export class User{
    @PrimaryGeneratedColumn( {type:'bigint'})
    id:number;

    @Column()
    password: string;

    @Column()
    createdAt:  Date;

    @Column({ unique: true })
    email: string;
    
    @Column({nullable: true})
    authStrategy: string;

    @OneToOne(() => Profile )
    @JoinColumn()
    profile: Profile


    

}