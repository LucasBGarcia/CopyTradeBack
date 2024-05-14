import { Test, TestingModule } from '@nestjs/testing';
import { StartBotService } from './start-bot.service';

describe('StartBotService', () => {
  let service: StartBotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StartBotService],
    }).compile();

    service = module.get<StartBotService>(StartBotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
