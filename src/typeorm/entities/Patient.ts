import { Column, Double, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'patients'})
export class Patient{
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    createdAt: Date;

    @Column()
    age: number;


    @Column()
    dob: Date;

    @Column()
    weight : Double;

    @Column()
    height: Double;

    @Column()
    diabetes : boolean;
    
    @Column({ nullable: true })
    authStrategy: string;
}