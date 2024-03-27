import { Test, TestingModule } from '@nestjs/testing';
import { DetalleVehiculosService } from './detalle_vehiculos.service';

describe('DetalleVehiculosService', () => {
  let service: DetalleVehiculosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetalleVehiculosService],
    }).compile();

    service = module.get<DetalleVehiculosService>(DetalleVehiculosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
