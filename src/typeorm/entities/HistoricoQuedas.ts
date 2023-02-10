import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "./Patient";
import { ProfessionalSaude } from "./ProfessionalSaude";
import { Queda } from "./Queda";

@Entity({ name: 'historicoQueda', synchronize: false })
export class HistoricoQueda {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ type: 'datetime' })
    date: Date;

    @Column({ type: 'int' })
    numeroOCorrencia: number;

    @Column({type: "varchar" })
    posicao:string;



    @Column({ type: "varchar" })
    nomePaciente: Patient["nome"];

    @Column({ type: "int" })
    idPaciente: Patient["id"];
 
    @OneToMany((type) => Queda, (queda) => queda.id)
    queda: Queda["id"];



    @Column({ type: 'double'})
    tempMax: Date;

    @Column({ type: 'double' })
    tempMin: Date;
  

    
 



}




