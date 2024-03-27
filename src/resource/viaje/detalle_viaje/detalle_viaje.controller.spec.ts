import { Test, TestingModule } from '@nestjs/testing';
import { DetalleViajeController } from './detalle_viaje.controller';
import { DetalleViajeService } from './detalle_viaje.service';

describe('DetalleViajeController', () => {
  let controller: DetalleViajeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetalleViajeController],
      providers: [DetalleViajeService],
    }).compile();

    controller = module.get<DetalleViajeController>(DetalleViajeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
