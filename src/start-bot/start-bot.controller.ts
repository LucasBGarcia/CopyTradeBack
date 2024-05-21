import { Body, Controller, Post } from '@nestjs/common';
import { StartBotService } from './start-bot.service';

@Controller('start-bot')
export class StartBotController {
    constructor(private readonly startBotService:StartBotService){}

    @Post()
    StartBot(
        @Body('listenKey') listenKey:string,
        @Body('AtivaBot') AtivaBot:boolean

    ):Promise<any>{
        return this.startBotService.StartBot(listenKey,AtivaBot)
    }
}
