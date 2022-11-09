import { Double } from "typeorm";

export type CreateUserParams ={
    username: string;
    password: string;
    email:string;

}

export type UpdateUserParams = {
    username: string;
    password: string;
    email: string;

}

export type CreateUserProfileParams = {
    firstName: string;

    lastName: string;

    age: number;
    dob: string;
}