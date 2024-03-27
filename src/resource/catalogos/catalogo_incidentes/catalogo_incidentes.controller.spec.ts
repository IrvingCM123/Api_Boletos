import { Test, TestingModule } from '@nestjs/testing';
import { CatalogoIncidentesController } from './catalogo_incidentes.controller';
import { CatalogoIncidentesService } from './catalogo_incidentes.service';

describe('CatalogoIncidentesController', () => {
  let controller: CatalogoIncidentesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatalogoIncidentesController],
      providers: [CatalogoIncidentesService],
    }).compile();

    controller = module.get<CatalogoIncidentesController>(CatalogoIncidentesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
