import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TakeListenKeyModule } from './take-listen-key/take-listen-key.module';
import { GetAccountBalanceUsdtModule } from './get-account-balance-usdt/get-account-balance-usdt.module';

@Module({
  imports: [TakeListenKeyModule, GetAccountBalanceUsdtModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
