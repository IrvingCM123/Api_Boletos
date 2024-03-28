import { Test, TestingModule } from '@nestjs/testing';
import { DatosEmergenciaController } from './datos_emergencia.controller';
import { DatosEmergenciaService } from './datos_emergencia.service';

describe('DatosEmergenciaController', () => {
  let controller: DatosEmergenciaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatosEmergenciaController],
      providers: [DatosEmergenciaService],
    }).compile();

    controller = module.get<DatosEmergenciaController>(DatosEmergenciaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
