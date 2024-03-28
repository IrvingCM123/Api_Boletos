import { Test, TestingModule } from '@nestjs/testing';
import { InstruccionesAbordajeController } from './instrucciones_abordaje.controller';
import { InstruccionesAbordajeService } from './instrucciones_abordaje.service';

describe('InstruccionesAbordajeController', () => {
  let controller: InstruccionesAbordajeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstruccionesAbordajeController],
      providers: [InstruccionesAbordajeService],
    }).compile();

    controller = module.get<InstruccionesAbordajeController>(InstruccionesAbordajeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
