import { Exclude } from "class-transformer";
import { Double } from "typeorm";

export type CreateUserParams ={
    
    password: string;
    email:string;

}

export type UpdateUserParams = {
  
    password: string;
    email: string;

}

export type CreateUserProfileParams = {
    firstName: string;

    lastName: string;

    age: number;
    dob: string;
}


export type CreatePatientParams = {

    password: string;
    email: string;

}

export class SerializedUser {

    @Exclude()
    password: string;


    email: string;
}