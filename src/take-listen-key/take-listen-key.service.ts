import { Injectable } from '@nestjs/common';

@Injectable()
export class TakeListenKeyService {
    async getApiListeKey(apiKey: string): Promise<string> {
        const apiUrl = 'https://api.binance.com/api'
        try {
            if (!apiKey)
                throw new Error('Preencha corretamente sua API KEY e SECRET KEY');

            try {
                const result = await fetch(`${apiUrl}/v3/userDataStream`, {
                    method: 'POST',
                    headers: {
                        'X-MBX-APIKEY': apiKey
                    },
                });
                const data = await result.json();
                const retorno = {
                    value: data,
                    status: 200
                }
                return JSON.stringify(retorno);
            } catch (err) {
                const retorno = {
                    value: `Erro no fetch de getApiListeKey: ${err.data}`,
                    status: 400
                }
                return JSON.stringify(retorno);
            }
        } catch (e) {
            const retorno = {
                value: `Erro no retorno de getApiListeKey: ${e.data}`,
                status: 400
            }
            return JSON.stringify(retorno);
        }
    }
}
