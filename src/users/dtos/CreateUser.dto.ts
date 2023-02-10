import { IsNotEmpty, IsEmail, IsStrongPassword } from "class-validator";

export class CreateUserDto{


    @IsStrongPassword()
    @IsNotEmpty()
    password:string;

    
    @IsEmail()
    @IsNotEmpty()
    email:  string;
    

}