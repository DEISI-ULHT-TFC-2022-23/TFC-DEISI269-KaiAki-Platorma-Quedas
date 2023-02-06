import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "./Patient";
import { ProfessionalSaude } from "./ProfessionalSaude";

@Entity({ name: 'historicoQueda', synchronize: false })
export class HistoricoQueda {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    date: Date;

    @Column({ type: 'int' })
    numeroOCorrencia: number;

    @Column({type: "varchar" })
    posicao:string;

    #Queda_id

    @Column({ type: "varchar" })
    nomePaciente: Patient;

    @Column({ type: 'double'})
    tempMax: Date;

    @Column({ type: 'double' })
    tempMin: Date;

    
 



}




