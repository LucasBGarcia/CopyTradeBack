import { Module } from '@nestjs/common';
import { NewTradeService } from './new-trade.service';
import { NewTradeController } from './new-trade.controller';

@Module({
  providers: [NewTradeService],
  controllers: [NewTradeController]
})
export class NewTradeModule {}
