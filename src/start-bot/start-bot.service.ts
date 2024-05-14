import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';

@Injectable()
export class StartBotService {
    async StartBot(listenKey: string): Promise<any> {
        const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws'
        console.log(listenKey)
        return new Promise((resolve, reject) => {
            try {
                if (listenKey) {
                    const ws = new WebSocket(`${BINANCE_WS_URL}/${listenKey}`);
                    ws.onmessage = async (event: any) => {
                        const trade = JSON.parse(event.data)
                        console.log('trade', trade)
                        if( trade.e ==='executionReport'){
                            resolve(JSON.stringify(trade));
                        }
                    }
                }
            } catch (err) {
                reject(err);
            }
        });

    }
}
