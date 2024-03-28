import { Test, TestingModule } from '@nestjs/testing';
import { CatalogoCategoriasController } from './catalogo_categorias.controller';
import { CatalogoCategoriasService } from './catalogo_categorias.service';

describe('CatalogoCategoriasController', () => {
  let controller: CatalogoCategoriasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatalogoCategoriasController],
      providers: [CatalogoCategoriasService],
    }).compile();

    controller = module.get<CatalogoCategoriasController>(CatalogoCategoriasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
