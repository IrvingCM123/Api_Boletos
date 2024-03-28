import { Test, TestingModule } from '@nestjs/testing';
import { InstruccionesSeguridadController } from './instrucciones_seguridad.controller';
import { InstruccionesSeguridadService } from './instrucciones_seguridad.service';

describe('InstruccionesSeguridadController', () => {
  let controller: InstruccionesSeguridadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstruccionesSeguridadController],
      providers: [InstruccionesSeguridadService],
    }).compile();

    controller = module.get<InstruccionesSeguridadController>(InstruccionesSeguridadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
