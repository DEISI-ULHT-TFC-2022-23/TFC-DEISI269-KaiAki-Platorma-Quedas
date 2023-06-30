export class CreatePacienteDto {
    primeiro_nome: string;
    sobrenome: string;
    numero_telefone: string;
    email: string;
    altura: number;
    peso: number;
    password: string;
    password_encriptada: string;
    diabetes: boolean;
    data_nascimento: Date;
    data_criacao: Date;
  }