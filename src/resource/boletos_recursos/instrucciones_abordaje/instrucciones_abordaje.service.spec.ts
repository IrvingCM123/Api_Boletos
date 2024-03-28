import { Test, TestingModule } from '@nestjs/testing';
import { InstruccionesAbordajeService } from './instrucciones_abordaje.service';

describe('InstruccionesAbordajeService', () => {
  let service: InstruccionesAbordajeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstruccionesAbordajeService],
    }).compile();

    service = module.get<InstruccionesAbordajeService>(InstruccionesAbordajeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
