import { Test, TestingModule } from '@nestjs/testing';
import { NewTradeController } from './new-trade.controller';

describe('NewTradeController', () => {
  let controller: NewTradeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewTradeController],
    }).compile();

    controller = module.get<NewTradeController>(NewTradeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
