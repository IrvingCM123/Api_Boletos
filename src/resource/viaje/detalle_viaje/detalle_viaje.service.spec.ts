import { Test, TestingModule } from '@nestjs/testing';
import { DetalleViajeService } from './detalle_viaje.service';

describe('DetalleViajeService', () => {
  let service: DetalleViajeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetalleViajeService],
    }).compile();

    service = module.get<DetalleViajeService>(DetalleViajeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
