import { Test, TestingModule } from '@nestjs/testing';
import { TakeListenKeyService } from './take-listen-key.service';

describe('TakeListenKeyService', () => {
  let service: TakeListenKeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TakeListenKeyService],
    }).compile();

    service = module.get<TakeListenKeyService>(TakeListenKeyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
