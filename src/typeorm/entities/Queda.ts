import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
  } from 'typeorm';
  import { Paciente } from './Patient';
  import { HistoricoQueda } from './HistoricoQuedas';
  import { Notificacao } from './Notificacao';
  
  @Entity('queda')
  export class Queda {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;
  
    @Column({ type: 'datetime', nullable: true })
    date: Date;

    @Column({ type: 'varchar', length: 255 })
    posicao: string;
  
    @Column({ type: 'double' })
    temperatura_corporal: number;
  
    @ManyToOne(() => Paciente, (paciente) => paciente.quedas)
    @JoinColumn({ name: 'paciente_id' })
    paciente: Paciente;
  
    @OneToMany(() => HistoricoQueda, (historicoQueda) => historicoQueda.queda)
    historicoQuedas: HistoricoQueda[];
  
    @OneToMany(() => Notificacao, (notificacao) => notificacao.queda)
    notificacoes: Notificacao[];
  }