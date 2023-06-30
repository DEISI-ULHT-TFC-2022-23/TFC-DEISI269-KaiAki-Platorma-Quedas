import { PickType } from '@nestjs/mapped-types';
import { User } from 'src/typeorm/entities/User';

export class CreateUserDto extends PickType(User, ['username', 'password'] as const) {}