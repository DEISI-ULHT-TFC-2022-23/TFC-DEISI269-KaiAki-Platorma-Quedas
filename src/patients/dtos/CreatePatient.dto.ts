import { Equals, IsEmail, isEmpty, IsNotEmpty, IsStrongPassword } from "class-validator";

export class createPatientDto {

@IsEmail()
@IsNotEmpty()
email: string;

@IsEmail()
@IsNotEmpty()
confirmEmail:string;

@IsStrongPassword()
@IsNotEmpty()
password: string;

@IsStrongPassword()
@IsNotEmpty()
confirmPassword: string;



    
}