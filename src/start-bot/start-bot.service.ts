import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';

@Injectable()
export class StartBotService {
    async StartBot(listenKey: string, AtivaBot: boolean): Promise<any> {
        const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws';

        console.log('LISTENKEY', listenKey);
        console.log('ATIVABOT', AtivaBot);

        if (listenKey && AtivaBot) {
            console.log('Initializing WebSocket connection...');
            // return new Promise((resolve, reject) => {
                try {
                    const ws = new WebSocket(`${BINANCE_WS_URL}/${listenKey}`);
                    console.log('WS',ws)
                    ws.onmessage = (event: any) => {
                        const trade = JSON.parse(event.data);
                        console.log('trade', trade);

                        if (trade.e === 'executionReport') {
                            const retorno = {
                                value: trade,
                                status: 200
                            };
                            // resolve(retorno);
                            return(retorno);
                        }
                    };

                    ws.onerror = (err) => {
                        console.error('WebSocket error:', err);
                        // reject(`WebSocket error: ${err.message}`);
                    };

                    ws.onclose = () => {
                        console.log('WebSocket connection closed');
                    };
                } catch (err) {
                    console.error('Error in WebSocket connection:', err);
                    // reject(`Erro no retorno StartBot: ${err.message}`);
                }
            // });
        } else {
            return Promise.resolve('Bot pausado');
        }
    }
}


// import { Injectable } from '@nestjs/common';
// import * as WebSocket from 'ws';

// @Injectable()
// export class StartBotService {
//     async StartBot(listenKey: string, AtivaBot: boolean): Promise<any> {
//         const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws'
//         console.log('LISTENKEY', listenKey)
//         console.log('ATIVABOT', AtivaBot)

//         if (listenKey && AtivaBot) {
//             console.log('ta caindo dentro do if')
//             return new Promise((resolve, reject) => {
//                 try {
//                     const ws = new WebSocket(`${BINANCE_WS_URL}/${listenKey}`);
//                     ws.onmessage = async (event: any) => {
//                         const trade = JSON.parse(event.data)
//                         console.log('trade', trade)
//                         if (trade.e === 'executionReport') {
//                             const retorno = {
//                                 value: trade,
//                                 status: 200
//                             }
//                             resolve(JSON.stringify(retorno));
//                         }
//                     }
//                 } catch (err) {
//                     console.log('err', err.data)
//                     const retorno = {
//                         value: `Erro no retorno StartBot: ${err.data}`,
//                         status: 400
//                     }
//                     reject(JSON.stringify(retorno));
//                 }
//             });
//         } else {
//             return ('Bot pausado')
//         }
//     }
// }
