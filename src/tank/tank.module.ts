import { Module } from '@nestjs/common';
import { tankResolver } from './tank.resolver';

@Module({
  providers: [tankResolver],
})
export class TankModule {}
