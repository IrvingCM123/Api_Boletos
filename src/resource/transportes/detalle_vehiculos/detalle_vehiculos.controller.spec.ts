import { Test, TestingModule } from '@nestjs/testing';
import { DetalleVehiculosController } from './detalle_vehiculos.controller';
import { DetalleVehiculosService } from './detalle_vehiculos.service';

describe('DetalleVehiculosController', () => {
  let controller: DetalleVehiculosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetalleVehiculosController],
      providers: [DetalleVehiculosService],
    }).compile();

    controller = module.get<DetalleVehiculosController>(DetalleVehiculosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
