import { Body, Controller, Post } from '@nestjs/common';
import { NewTradeService } from './new-trade.service';

@Controller('new-trade')
export class NewTradeController {
    constructor(private readonly tradeService: NewTradeService) { }
    @Post()
    NewTrade(
        @Body('trade') trade: Object,
        @Body('accounts') accounts: Object[],
        @Body('ValorInicialMaster') ValorInicialMaster: number,
        @Body('KeysMaster') KeysMaster: Object,

    ): Promise<any> {
        return this.tradeService.NewTrade(trade, accounts, ValorInicialMaster, KeysMaster)
    }

}
