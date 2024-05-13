import { Module } from '@nestjs/common';
import { TakeListenKeyService } from './take-listen-key.service';
import { TakeListenKeyController } from './take-listen-key.controller';

@Module({
  providers: [TakeListenKeyService],
  controllers: [TakeListenKeyController]
})
export class TakeListenKeyModule {}
