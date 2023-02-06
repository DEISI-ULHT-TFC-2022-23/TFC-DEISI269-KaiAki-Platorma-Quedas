import { Column, Double, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'patients'})
export class Patient{
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    firstName: string;

    @Column()
    numeroTelefone: string;

    @Column()
    email: string;

    @Column()
    password:string;

    @Column()
    altura: number;

    @Column()
    peso: number;

    @Column({type:"double"})
    tempQueda: number;

    @Column({ type: "double" })
    tempMax: number;

    @Column({ type: "double" })
    tempMin: number;

    @Column()
    lastName: string;

    @Column()
    createdAt: Date;

    @Column()
    idade: number;


    @Column()
    datanascimento: Date;

    



    @Column()
    diabetes : boolean;
    
    @Column({ nullable: true })
    authStrategy: string;
}