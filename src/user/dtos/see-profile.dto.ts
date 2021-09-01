import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CoreOutput } from './core-output.dto';

@ArgsType()
export class SeeProfileInput {
  @Field((type) => Number)
  userId: number;
}

@ObjectType()
export class SeeProfileOutput extends CoreOutput {
  @Field((type) => User, { nullable: true })
  user?: User;
}
