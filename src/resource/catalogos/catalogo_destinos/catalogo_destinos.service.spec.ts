import { Test, TestingModule } from '@nestjs/testing';
import { CatalogoDestinosService } from './catalogo_destinos.service';

describe('CatalogoDestinosService', () => {
  let service: CatalogoDestinosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatalogoDestinosService],
    }).compile();

    service = module.get<CatalogoDestinosService>(CatalogoDestinosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
