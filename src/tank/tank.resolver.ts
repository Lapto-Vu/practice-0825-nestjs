import { Query, Resolver } from '@nestjs/graphql';
import { tank } from './entities/tank.entity';

@Resolver()
export class tankResolver {
  @Query((returns) => tank)
  isDogGood() {
    return true;
  }
}
