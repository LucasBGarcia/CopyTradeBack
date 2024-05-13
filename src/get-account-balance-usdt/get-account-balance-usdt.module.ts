import { Module } from '@nestjs/common';
import { GetAccountBalanceUsdtService } from './get-account-balance-usdt.service';
import { GetAccountBalanceUsdtController, GetAllAccountsBalanceUsdtController } from './get-account-balance-usdt.controller';

@Module({
  providers: [GetAccountBalanceUsdtService],
  controllers: [GetAccountBalanceUsdtController, GetAllAccountsBalanceUsdtController]
})
export class GetAccountBalanceUsdtModule {}
