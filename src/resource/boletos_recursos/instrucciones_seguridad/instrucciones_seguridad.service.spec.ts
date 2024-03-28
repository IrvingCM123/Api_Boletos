import { Test, TestingModule } from '@nestjs/testing';
import { InstruccionesSeguridadService } from './instrucciones_seguridad.service';

describe('InstruccionesSeguridadService', () => {
  let service: InstruccionesSeguridadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstruccionesSeguridadService],
    }).compile();

    service = module.get<InstruccionesSeguridadService>(InstruccionesSeguridadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
