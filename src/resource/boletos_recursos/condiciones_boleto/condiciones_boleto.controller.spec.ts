import { Test, TestingModule } from '@nestjs/testing';
import { CondicionesBoletoController } from './condiciones_boleto.controller';
import { CondicionesBoletoService } from './condiciones_boleto.service';

describe('CondicionesBoletoController', () => {
  let controller: CondicionesBoletoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CondicionesBoletoController],
      providers: [CondicionesBoletoService],
    }).compile();

    controller = module.get<CondicionesBoletoController>(CondicionesBoletoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
