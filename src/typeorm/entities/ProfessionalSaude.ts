import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, OneToOne } from "typeorm";
import { HistoricoQueda } from "./HistoricoQuedas";
import { Patient } from "./Patient";


@Entity({ name: 'professinoalSaude', synchronize: false })
export class ProfessionalSaude{
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age:number;

    @Column({ type: 'varchar' })
     numeroTelefone: string;


    @Column({ type: 'varchar'})
     email: string;

    @Column({ type: 'varchar'})
     password: string;

    @Column({ type: 'datetime' })
     dataNascimento: Date;

    @Column({ type: 'datetime'})
     created_at: Date;

    
    @Column({ unique: true })
    username: string;

    @Column({ nullable: true })
    authStrategy: string;

    @Column()
    dob:Date;

    @OneToMany((type) => Patient, (patients) => patients.nome)
    ListaPacientes: Patient[];

    @OneToOne(() => Patient)
    @JoinColumn()
    patient_id: Patient["id"];




    @OneToOne(() => HistoricoQueda)
    @JoinColumn()
    historicoQueda: HistoricoQueda;

}