// import { Injectable } from '@nestjs/common';
// import * as crypto from 'crypto';
// import axios from 'axios';

// const apiUrl = 'https://api.binance.com/api';

// @Injectable()
// export class GetAccountBalanceUsdtService {
//     async getUSDTBalance(apiKey: string, apiSecret: string): Promise<any> {
//         console.log('API KEY', apiKey)
//         console.log('API secret', apiSecret)

//         try {
//             if (!apiSecret) {
//                 throw new Error('API secret is not defined!');
//             }
//             const timeRes = await axios.get('https://api.binance.com/api/v3/time');
//             const timeData = timeRes.data;
//             const timestamp = timeData.serverTime;
//             const queryString = `timestamp=${timestamp}`;
//             const signature = generateSignature(queryString, apiSecret);
//             const result = await axios.get(`${apiUrl}/v3/account`, {
//                 params: {
//                     timestamp: timestamp,
//                     signature: signature
//                 },
//                 headers: {
//                     'X-MBX-APIKEY': apiKey
//                 }
//             });
//             const res = result.data;
//             const filterBalance = res.balances.filter((balance: { asset: string }) => balance.asset === 'USDT');
//             console.log('apikey', apiKey);
//             console.log('apiSecret', apiSecret);
//             console.log('filterBalance', filterBalance);

//             return JSON.stringify(filterBalance[0].free);
//         } catch (err) {
//             console.error(err);
//             throw err;
//         }
//     }

//     async getUSDTBalanceAllAccs(contasSTR: object[]): Promise<any> {
//         try {
//             let accountsBalance: object[] = [];
//             await Promise.all(contasSTR.map(async (contas: any) => {
//                 const balance = await this.getUSDTBalance(contas.key, contas.secret);
//                 console.log('contas.name', contas.name);
//                 console.log("Number(JSON.parse(balance))", Number(JSON.parse(balance)));
//                 accountsBalance.push({
//                     name: contas.name,
//                     balance: Number(JSON.parse(balance))
//                 });
//             }));
//             return JSON.stringify(accountsBalance);
//         } catch (err) {
//             console.error(err);
//             throw err;
//         }
//     }
// }

// function generateSignature(queryString: string, apiSecret: string) {
//     return crypto.createHmac('sha256', apiSecret).update(queryString).digest('hex');
// }



import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

const apiUrl = 'https://api.binance.com/api'

@Injectable()
export class GetAccountBalanceUsdtService {
    async getUSDTBalance(apiKey: string, apiSecret: string): Promise<any> {
        console.log('API KEY', apiKey)
        console.log('API secret', apiSecret)
         try {
            if (!apiSecret) {
                throw new Error('API secret is not defined!');
            }
            const timeRes = await fetch(`https://api.binance.com/api/v3/time`);
            const timeData = await timeRes.json();
            const timestamp = timeData.serverTime;
            const queryString = `timestamp=${timestamp}`;
            const signature = generateSignature(queryString, apiSecret);
            const result = await fetch(`${apiUrl}/v3/account?${queryString}&signature=${signature}`, {
                method: 'GET',
                headers: {
                    'X-MBX-APIKEY': apiKey
                },
            });
            if(result){
                const res = await result.json()
                const filterBalance = res.balances.filter((balance: { asset: string; }) => balance.asset === 'USDT')
                return JSON.stringify(filterBalance[0].free)

            }
            return '0'
        } catch (err) {
            console.error(err)
            throw err;
        }
    }
    async getUSDTBalanceAllAccs(contasSTR: object[]): Promise<any> {
        try {
            let accountsBalance: object[] = []
            await Promise.all(contasSTR.map(async (contas: any) => {
                const balance = await this.getUSDTBalance(contas.key, contas.secret)
                accountsBalance.push({
                    name: contas.name,
                    balance: Number(JSON.parse(balance))
                })
            }))
            return JSON.stringify(accountsBalance)
        } catch (err) {
            console.error(err)
            throw err;
        }
    }


}

function generateSignature(queryString: string, apiSecret: string) {
    return crypto.createHmac('sha256', apiSecret).update(queryString).digest('hex');
}
