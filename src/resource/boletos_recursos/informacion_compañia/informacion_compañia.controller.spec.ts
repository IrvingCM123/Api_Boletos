import { Test, TestingModule } from '@nestjs/testing';
import { InformacionCompañiaController } from './informacion_compañia.controller';
import { InformacionCompañiaService } from './informacion_compañia.service';

describe('InformacionCompañiaController', () => {
  let controller: InformacionCompañiaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InformacionCompañiaController],
      providers: [InformacionCompañiaService],
    }).compile();

    controller = module.get<InformacionCompañiaController>(InformacionCompañiaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
