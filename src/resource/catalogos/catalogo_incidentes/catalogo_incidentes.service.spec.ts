import { Test, TestingModule } from '@nestjs/testing';
import { CatalogoIncidentesService } from './catalogo_incidentes.service';

describe('CatalogoIncidentesService', () => {
  let service: CatalogoIncidentesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatalogoIncidentesService],
    }).compile();

    service = module.get<CatalogoIncidentesService>(CatalogoIncidentesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
