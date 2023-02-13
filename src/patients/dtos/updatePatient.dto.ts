import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class updatePatientDto {

    @IsStrongPassword()
    password: string;
    @IsEmail()
    email: string;

   



}