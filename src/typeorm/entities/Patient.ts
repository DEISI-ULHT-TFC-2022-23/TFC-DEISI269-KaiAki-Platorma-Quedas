import { Column, Double, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { HistoricoQueda } from "./HistoricoQuedas";
import { ProfessionalSaude } from "./ProfessionalSaude";

@Entity({name:'patients'})
export class Patient{
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
     nome: string;

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


    @Column( { type: "datetime"})
    createdAt: Date;

    @Column()
    idade: number;


    @Column()
    datanascimento: Date;

    
   @OneToOne( () => HistoricoQueda)
   @JoinColumn()
   historicoQueda: HistoricoQueda



    @OneToOne(() => ProfessionalSaude)
    @JoinColumn()
    professionalSaude: ProfessionalSaude



    @Column()
    diabetes : boolean;
    
    @Column({ nullable: true })
    authStrategy: string;
}