import { Test, TestingModule } from '@nestjs/testing';
import { CatalogoCategoriasService } from './catalogo_categorias.service';

describe('CatalogoCategoriasService', () => {
  let service: CatalogoCategoriasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatalogoCategoriasService],
    }).compile();

    service = module.get<CatalogoCategoriasService>(CatalogoCategoriasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
