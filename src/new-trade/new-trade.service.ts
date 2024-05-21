import { Injectable } from '@nestjs/common';
import { copyTrade } from 'src/utils/CopyTrade';
import { tradePorcentageMaster } from 'src/utils/calculation/percentage';

@Injectable()
export class NewTradeService {
    async NewTrade(trade: object,
        accounts: object[],
        ValorInicialMaster: number,
        KeysMaster: object) {
        console.log('ValorInicialMaster', ValorInicialMaster)
        console.log('KeysMaster', KeysMaster)


        const porcentagemMaster = await tradePorcentageMaster(ValorInicialMaster, KeysMaster)
        console.log('porcentagemMaster', porcentagemMaster)
        const pr = accounts.map(async (acc: any) => {

            const data = await copyTrade(trade, acc.secret, acc.key, acc.name, porcentagemMaster);
            console.log('data recebida', data)
            // return api.newOrder(data, acc.apiKey, acc.apiSecret, acc.Name);
        });
        console.log('Retorno copy trade', pr)

    }
}
