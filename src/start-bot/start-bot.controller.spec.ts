import { Test, TestingModule } from '@nestjs/testing';
import { StartBotController } from './start-bot.controller';

describe('StartBotController', () => {
  let controller: StartBotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StartBotController],
    }).compile();

    controller = module.get<StartBotController>(StartBotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
