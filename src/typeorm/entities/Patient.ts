import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    OneToOne,
    JoinColumn,
  } from 'typeorm';
  import { PacienteProfissional } from './pacienteProfissional.entity';
  import { Queda } from './queda';
import { forwardRef } from '@nestjs/common';
  
  @Entity('paciente')
  export class Paciente {
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
  
    @Column({ type: 'double' })
    altura: number;
  
    @Column({ type: 'double' })
    peso: number;
  
    @Column({ type: 'varchar', length: 255 })
    password: string;
  
    @Column({ type: 'varchar', length: 255 })
    password_encriptada: string;
  
    @Column({ type: 'tinyint' })
    diabetes: boolean;
  
    @Column({ type: 'datetime' })
    data_nascimento: Date;
  
    @Column({ type: 'datetime' })
    data_criacao: Date;
  
    @OneToMany(() => Queda, (queda) => queda.paciente)
    quedas: Queda[];

  

   
  }