"use server"
import * as WebSocket from 'ws';
import { GetAccountBalanceUsdtService } from 'src/get-account-balance-usdt/get-account-balance-usdt.service';
import { calcularValorPorPorcentagem } from './calculation/percentage';
import { encontrarPrimeiroNaoZero } from './FindFirtsNotZero/FindFirstNotZero';

const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws'

const serviceUSDtBalance = new GetAccountBalanceUsdtService()
function buscaValor(symbol: any) {
    return new Promise((resolve, reject) => {
        try {
            const wsPrice = new WebSocket(`${BINANCE_WS_URL}/${symbol.toLowerCase()}@ticker`); // Use WebSocket directly
            wsPrice.onmessage = (event: any) => {
                const obj = JSON.parse(event.data);
                const currentPrice = parseFloat(obj.a);
                resolve(currentPrice);
            };

            wsPrice.onerror = (error) => {
                reject(error);
            };
        } catch (err) {
            reject(err);
        }
    });
}

async function PegaMoedar(apiSecret: string, moeda: string, apiKey: string) {
    const ValorCarteiraCliente = await serviceUSDtBalance.getAllBalance(apiSecret, apiKey);
    const moedaSplitCliente = moeda.split('USD');
    console.log('ValorCarteiraCliente', ValorCarteiraCliente)
    console.log('moedaSplitCliente', moedaSplitCliente)
    if (ValorCarteiraCliente) {
        const moedaCliente = ValorCarteiraCliente.spot.filter((pares: { asset: string; }) => pares.asset === moedaSplitCliente[0]);
        return (moedaCliente);
    }
}

export async function copyTrade(trade: any, apiSecret: string, apiKey: string, apiName: string, PorcentagemMaster: any) {
    let CompraCliente;
    let VendaCliente;
    console.log("aqui em cima do valor atual")
    const valorAtual = await buscaValor(trade.s);
    console.log('VALOR ATUAL', valorAtual)
    if (trade.S == 'BUY') {
        console.log('ta caindo no buy')
        const ValorCarteiraClienteSTR = await serviceUSDtBalance.getUSDTBalance(apiKey, apiSecret);
        const ValorCarteiraCliente = ValorCarteiraClienteSTR? JSON.parse(ValorCarteiraClienteSTR): null
        console.log('ValorCarteiraCliente', ValorCarteiraCliente)
        CompraCliente = await calcularValorPorPorcentagem(ValorCarteiraCliente.value, PorcentagemMaster, trade.q, valorAtual, apiName);
        console.log('calcularValorPorPorcentagem', CompraCliente)
    }
    if (trade.S == 'SELL') {
        console.log('ta caindo no sell')
        const posicZero = encontrarPrimeiroNaoZero(trade.q);
        const ValorCarteiraCliente = await PegaMoedar(apiSecret, trade.s, apiKey);
        const valor = Number(ValorCarteiraCliente[0].free);
        const fator = Math.pow(10, await posicZero);
        const arredonda = Math.floor(valor * fator) / fator;
        VendaCliente = arredonda.toFixed(await posicZero);
    }
    const data = {
        symbol: trade.s,
        side: trade.S,
        type: trade.o
    } as { symbol: any; side: any; type: any; quantity?: any, price?: any, timeInForce?: any, stopPrice?: any };;
    if (trade.q && parseFloat(trade.q)) {
        if (CompraCliente) {
            data.quantity = Math.abs(Number(CompraCliente)).toString();
        } else if (VendaCliente) {
            data.quantity = Math.abs(Number(VendaCliente)).toString();
        } else {
            data.quantity = trade.q;
        }
    }
    if (trade.p && parseFloat(trade.p)) {
        data.price = trade.p;
        data.timeInForce = trade.f;
    }
    if (trade.f && trade.f !== "GTC") {
        data.timeInForce = trade.f;
    }
    if (trade.P && parseFloat(trade.P)) {
        data.stopPrice = trade.P;
    }
    console.log('RETORNO DENTRO DE COPY TRADE', data)
    return data;
}