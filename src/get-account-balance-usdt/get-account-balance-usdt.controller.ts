import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetAccountBalanceUsdtService } from './get-account-balance-usdt.service';

@Controller('get-account-balance-usdt')
export class GetAccountBalanceUsdtController {
    constructor(private readonly accountService:GetAccountBalanceUsdtService){}

    @Post()
    getUSDTBalance(
        @Body('apiKey') apiKey:string,
        @Body('apiSecret') apiSecret:string
    ):Promise<any>{
        return this.accountService.getUSDTBalance(apiKey,apiSecret)
    }
}
@Controller('get-All-account-balance-usdt')
export class GetAllAccountsBalanceUsdtController {
    constructor(private readonly accountService:GetAccountBalanceUsdtService){}

    @Post()
    getUSDTBalanceAllAccs(
        @Body('contasSTR') contasSTR:object[],
    ):Promise<any>{
        console.log('teste')
        return this.accountService.getUSDTBalanceAllAccs(contasSTR)
    }
}

