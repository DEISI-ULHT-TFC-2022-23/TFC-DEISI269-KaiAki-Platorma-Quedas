import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "./Patient";
import { ProfessionalSaude } from "./ProfessionalSaude";

@Entity({ name: 'queda' })
export class Queda {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({type:"datetime"})
    date: Date;


    @Column({ type: "varchar"})
    posicao: string;



    @Column({ type: "varchar" })
    nomePaciente: Patient;

    @Column({ type: "bigint" })
    paciente_id: Patient;

    @Column({ type: 'double'})
    tempPaciente: number;




}




