import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class tank {
  @Field((is) => String)
  name: string;
}
