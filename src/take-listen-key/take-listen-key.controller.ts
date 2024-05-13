import { Body, Controller, Get, Post } from '@nestjs/common';
import { TakeListenKeyService } from './take-listen-key.service';

@Controller('take-listen-key')
export class TakeListenKeyController {
    constructor(private readonly takeListenKeyService: TakeListenKeyService) { }

    @Post()
    getApiListeKey(
        @Body('apiKey') apiKey: string
    ): Promise<any> {
        return this.takeListenKeyService.getApiListeKey(apiKey)
    }

}
