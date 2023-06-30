import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Queda } from './queda';
  
  @Entity('historico_queda')
  export class HistoricoQueda {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;
  
    @Column({ type: 'datetime', nullable: true})
    date: Date;

    @Column({ type: 'varchar', nullable: true })
    data: string;
  
    @Column({ type: 'bigint' })
    numero_ocorrencias: number;
  
    @Column({ type: 'varchar', length: 255 })
    posicao_corporal: string;
  
    @ManyToOne(() => Queda, (queda) => queda.historicoQuedas)
    @JoinColumn({ name: 'queda_id' })
    queda: Queda;
  }