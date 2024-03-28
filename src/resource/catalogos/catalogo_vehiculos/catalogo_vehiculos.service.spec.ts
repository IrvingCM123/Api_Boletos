import { Test, TestingModule } from '@nestjs/testing';
import { CatalogoVehiculosService } from './catalogo_vehiculos.service';

describe('CatalogoVehiculosService', () => {
  let service: CatalogoVehiculosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatalogoVehiculosService],
    }).compile();

    service = module.get<CatalogoVehiculosService>(CatalogoVehiculosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
