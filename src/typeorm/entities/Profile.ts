import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name:'user_profile'})
export class Profile{
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age:number;


    @Column({ unique: true })
    username: string;

    @Column({ nullable: true })
    authStrategy: string;

    @Column()
    dob:Date;

    

}