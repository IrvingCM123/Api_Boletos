import { Test, TestingModule } from '@nestjs/testing';
import { DatosEmergenciaService } from './datos_emergencia.service';

describe('DatosEmergenciaService', () => {
  let service: DatosEmergenciaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatosEmergenciaService],
    }).compile();

    service = module.get<DatosEmergenciaService>(DatosEmergenciaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
