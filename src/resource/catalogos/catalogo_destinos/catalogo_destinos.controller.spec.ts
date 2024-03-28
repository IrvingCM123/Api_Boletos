import { Test, TestingModule } from '@nestjs/testing';
import { CatalogoDestinosController } from './catalogo_destinos.controller';
import { CatalogoDestinosService } from './catalogo_destinos.service';

describe('CatalogoDestinosController', () => {
  let controller: CatalogoDestinosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatalogoDestinosController],
      providers: [CatalogoDestinosService],
    }).compile();

    controller = module.get<CatalogoDestinosController>(CatalogoDestinosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
