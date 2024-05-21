import { Test, TestingModule } from '@nestjs/testing';
import { NewTradeService } from './new-trade.service';

describe('NewTradeService', () => {
  let service: NewTradeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewTradeService],
    }).compile();

    service = module.get<NewTradeService>(NewTradeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
