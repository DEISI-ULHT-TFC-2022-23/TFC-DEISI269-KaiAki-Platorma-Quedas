import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  } from 'typeorm';
  import { PacienteProfissional } from './pacienteProfissional.entity';
  
  @Entity('profissional_saude')
  export class ProfissionalSaude {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;
  
    @Column({ type: 'varchar', length: 128 })
    primeiro_nome: string;
  
    @Column({ type: 'varchar', length: 128 })
    sobrenome: string;
  
    @Column({ type: 'varchar', length: 128 })
    numero_telefone: string;
  
    @Column({ type: 'varchar', length: 128 })
    email: string;
  
    @Column({ type: 'varchar', length: 128 })
    password: string;
  
    @Column({ type: 'varchar', length: 128 })
    password_encriptada: string;
  
    @Column({ type: 'datetime' })
    data_nascimento: Date;
  
    @Column({ type: 'datetime' })
    data_criacao: Date;
  
    @OneToMany(() => PacienteProfissional, pacienteProfissional => pacienteProfissional.profissional)
    pacienteProfissionais: PacienteProfissional[];
    
  }