"use server"
import { GetAccountBalanceUsdtService } from "src/get-account-balance-usdt/get-account-balance-usdt.service";
import { encontrarPrimeiroNaoZero } from "../FindFirtsNotZero/FindFirstNotZero";

const serviceUSDtBalance = new GetAccountBalanceUsdtService()

export async function tradePorcentageMaster(ValorTotalMasterSpot:number, keysMasterParse:any) {
    console.log(keysMasterParse.key)
   
    console.log(keysMasterParse.secret)

    if (keysMasterParse) {
        const ValueAfterTradeSTR = await serviceUSDtBalance.getUSDTBalance(keysMasterParse.key, keysMasterParse.secret);
        const ValueAfterTrade = ValueAfterTradeSTR? JSON.parse(ValueAfterTradeSTR): 0
        const valorgasto = ValorTotalMasterSpot - ValueAfterTrade.value;
        const porcentagem = (valorgasto / ValorTotalMasterSpot) * 100;
        return porcentagem.toFixed(2);
    }
}

export async function calcularValorPorPorcentagem(valorCarteira:any, porcentagem:any, tradeq:any, valorAtual:any, apiName:any) {
   console.log('TA CAINDO NO CALULAVALORPORPORCENTAGEM')
    const quantidadeNumber = Number(tradeq);
    const valor = await encontrarPrimeiroNaoZero(Number(quantidadeNumber.toFixed(8)));
    const valorReferentePorcentagem = (porcentagem / 100) * valorCarteira;
    const result = valorReferentePorcentagem / valorAtual;
    console.log('calcula valor por porcentagem valorCARTEIRA', valorCarteira)
    console.log(`${apiName} - Valor gasto: USDT ${valorReferentePorcentagem}`);
    console.log('retorno do calculovvalorPorPorcentagem', result.toFixed(valor))
    return result.toFixed(valor);
}

