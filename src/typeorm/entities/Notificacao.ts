import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "./Patient";
import { ProfessionalSaude } from "./ProfessionalSaude";
import { Queda } from "./Queda";

@Entity({ name: 'notificacao' })
export class Notificacao {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({type:"datetime"})
    date: Date;

    @OneToOne(() => Patient)
    @JoinColumn()
    patient_id: Patient["id"];

    @OneToOne(() => Queda)
    @JoinColumn()
    queda_id: Queda["id"];
   




}




