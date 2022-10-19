import { Test, TestingModule } from '@nestjs/testing';
import { InmueblesController } from './inmuebles.controller';
import { InmueblesService } from './inmuebles.service';

describe('InmueblesController', () => {
  let controller: InmueblesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InmueblesController],
      providers: [InmueblesService],
    }).compile();

    controller = module.get<InmueblesController>(InmueblesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
