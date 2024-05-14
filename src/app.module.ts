import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TakeListenKeyModule } from './take-listen-key/take-listen-key.module';
import { GetAccountBalanceUsdtModule } from './get-account-balance-usdt/get-account-balance-usdt.module';
import { StartBotModule } from './start-bot/start-bot.module';

@Module({
  imports: [TakeListenKeyModule, GetAccountBalanceUsdtModule, StartBotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
