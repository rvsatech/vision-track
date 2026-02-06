import { Test, TestingModule } from '@nestjs/testing';
import { BobinasController } from './bobinas.controller';
import { BobinasService } from './bobinas.service';

describe('BobinasController', () => {
  let controller: BobinasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BobinasController],
      providers: [BobinasService],
    }).compile();

    controller = module.get<BobinasController>(BobinasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
