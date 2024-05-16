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
                return data;
            } catch (err) {
                console.error('Erro ao fazer a requisição:', err);
                return 'Erro ao fazer a requisição';
            }
        } catch (e) {
            console.error('Erro:', e);
            return 'Erro interno';
        }
    }
}
