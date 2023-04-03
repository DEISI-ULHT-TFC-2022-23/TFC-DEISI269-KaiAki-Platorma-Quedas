import { BadRequestException, Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/auth/Utils/bcrypt';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserParams, CreateUserProfileParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private  readonly userRepository: Repository <User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    
    )
    
  {



    

    } 

    createUser(@Body() userDetails: CreateUserParams) {
      const password = encodePassword(userDetails.password);
      console.log(password);
        const newUser = this.userRepository.create({ ...userDetails, password,  createdAt: new Date(), });
        return this.userRepository.save(newUser);


       
    }


    findUsers(){
       return this.userRepository.find({relations: ['profile']});
    }

    findUserByEmail(email: string){

     return this.userRepository.findOneBy({ email });

       


     
    }

    fetchUserById(id: number){
     return null;
    }




    updateUser(id: number,updateUserDetails: UpdateUserParams){
          return  this.userRepository.update({id}, {... updateUserDetails});
    }

    deleteUser(id:number){
        return this.userRepository.delete({id});
    }

    async createUserProfile(id: number,createUserProfileDetails: CreateUserProfileParams){
        const user = await this.userRepository.findOneBy({id});
        if(!user) throw new HttpException('User not found. Cannot create a new Profile',HttpStatus.BAD_REQUEST,);
        const newProfile = this.profileRepository.create(createUserProfileDetails);
        const savedProfile = await this.profileRepository.save(newProfile);
        user.profile = savedProfile;
        return this.userRepository.save(user);


    }
}
