import { Inject, Injectable } from '@nestjs/common';
import { comparePasswords } from 'src/auth/Utils/bcrypt';
import { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class AuthService {

constructor(@Inject('USER_SERVICE') private readonly userService: UsersService ){
    
}
async validadeteUser(email:string, password: string){
console.log('Inside validate user');
const userBD = await this.userService.findUserByEmail(email);

if(userBD){
    const matched = comparePasswords(password, userBD.password);
    if(matched){
        console.log('Validação Utilizador correta');

        return userBD;
    } else{
        console.log('Passowrds não são iguais');
        return null;
    }
 
}


    console.log('Validação Utilizador falhou');

return null;

}



}
