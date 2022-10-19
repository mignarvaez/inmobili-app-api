import { Test, TestingModule } from '@nestjs/testing';
import { InmueblesService } from './inmuebles.service';

describe('InmueblesService', () => {
  let service: InmueblesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InmueblesService],
    }).compile();

    service = module.get<InmueblesService>(InmueblesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
