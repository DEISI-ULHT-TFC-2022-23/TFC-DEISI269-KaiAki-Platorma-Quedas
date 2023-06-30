import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Queda } from './queda';
  
  @Entity('notificacao')
  export class Notificacao {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;
  
    @Column({ type: 'datetime' })
    data: Date;
  
    @ManyToOne(() => Queda, (queda) => queda.notificacoes)
    @JoinColumn({ name: 'queda_id' })
    queda: Queda;
  }