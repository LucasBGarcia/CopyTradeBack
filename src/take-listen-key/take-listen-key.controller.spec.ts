import { Test, TestingModule } from '@nestjs/testing';
import { TakeListenKeyController } from './take-listen-key.controller';

describe('TakeListenKeyController', () => {
  let controller: TakeListenKeyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TakeListenKeyController],
    }).compile();

    controller = module.get<TakeListenKeyController>(TakeListenKeyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
