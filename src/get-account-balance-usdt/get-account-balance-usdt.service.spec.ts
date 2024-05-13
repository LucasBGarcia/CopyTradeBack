import { Test, TestingModule } from '@nestjs/testing';
import { GetAccountBalanceUsdtService } from './get-account-balance-usdt.service';

describe('GetAccountBalanceUsdtService', () => {
  let service: GetAccountBalanceUsdtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAccountBalanceUsdtService],
    }).compile();

    service = module.get<GetAccountBalanceUsdtService>(GetAccountBalanceUsdtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
