import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/podcast/dtos/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends PickType(User, [
  'password',
  'email',
  'role',
]) {}

@ObjectType()
export class CreateUserOutput extends CoreOutput {}
