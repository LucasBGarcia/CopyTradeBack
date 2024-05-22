import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';

@Injectable()
export class StartBotService {
    async StartBot(listenKey: string, AtivaBot: boolean): Promise<any> {
        const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws'
        console.log('LISTENKEY', listenKey)
        console.log('ATIVABOT', AtivaBot)

        if (listenKey && AtivaBot) {
            console.log('ta caindo dentro do if')
            return new Promise((resolve, reject) => {
                try {
                    const ws = new WebSocket(`${BINANCE_WS_URL}/${listenKey}`);
                    ws.onmessage = async (event: any) => {
                        const trade = JSON.parse(event.data)
                        console.log('trade', trade)
                        if (trade.e === 'executionReport') {
                            const retorno = {
                                value: trade,
                                status: 200
                            }
                            resolve(JSON.stringify(retorno));
                        }
                    }
                } catch (err) {
                    console.log('err', err.data)
                    const retorno = {
                        value: `Erro no retorno StartBot: ${err.data}`,
                        status: 400
                    }
                    reject(JSON.stringify(retorno));
                }
            });
        } else {
            return ('Bot pausado')
        }
    }
}
