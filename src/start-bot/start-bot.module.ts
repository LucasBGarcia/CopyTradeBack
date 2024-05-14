import { Module } from '@nestjs/common';
import { StartBotService } from './start-bot.service';
import { StartBotController } from './start-bot.controller';

@Module({
  providers: [StartBotService],
  controllers: [StartBotController]
})
export class StartBotModule {}
