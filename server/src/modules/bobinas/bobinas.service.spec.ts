import { Test, TestingModule } from '@nestjs/testing';
import { BobinasService } from './bobinas.service';

describe('BobinasService', () => {
  let service: BobinasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BobinasService],
    }).compile();

    service = module.get<BobinasService>(BobinasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
