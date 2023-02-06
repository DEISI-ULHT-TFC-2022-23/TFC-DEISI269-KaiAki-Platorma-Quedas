import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./Profile";

@Entity({ name: 'users' })
export class User{
    @PrimaryGeneratedColumn( {type:'bigint'})
    id:number;

    @Column( {unique:true})
    username: string;

    @Column()
    password: String;

    @Column()
    createdAt:  Date;

    @Column({ unique: true })
    email: String;
    
    @Column({nullable: true})
    authStrategy: string;

    @OneToOne(() => Profile )
    @JoinColumn()
    profile: Profile


    

}