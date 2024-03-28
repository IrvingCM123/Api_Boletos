import { Test, TestingModule } from '@nestjs/testing';
import { CatalogoVehiculosController } from './catalogo_vehiculos.controller';
import { CatalogoVehiculosService } from './catalogo_vehiculos.service';

describe('CatalogoVehiculosController', () => {
  let controller: CatalogoVehiculosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatalogoVehiculosController],
      providers: [CatalogoVehiculosService],
    }).compile();

    controller = module.get<CatalogoVehiculosController>(CatalogoVehiculosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
