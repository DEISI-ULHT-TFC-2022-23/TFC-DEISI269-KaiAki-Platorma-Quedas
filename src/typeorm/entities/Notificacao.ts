import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "./Patient";
import { ProfessionalSaude } from "./ProfessionalSaude";

@Entity({ name: 'notificacao' })
export class Notificacao {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({type:"datetime"})
    date: Date;


   




}




