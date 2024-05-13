import { Test, TestingModule } from '@nestjs/testing';
import { GetAccountBalanceUsdtController } from './get-account-balance-usdt.controller';

describe('GetAccountBalanceUsdtController', () => {
  let controller: GetAccountBalanceUsdtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAccountBalanceUsdtController],
    }).compile();

    controller = module.get<GetAccountBalanceUsdtController>(GetAccountBalanceUsdtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
