import { Test, TestingModule } from '@nestjs/testing';
import { InformacionBoletoController } from './informacion_boleto.controller';
import { InformacionBoletoService } from './informacion_boleto.service';

describe('InformacionBoletoController', () => {
  let controller: InformacionBoletoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InformacionBoletoController],
      providers: [InformacionBoletoService],
    }).compile();

    controller = module.get<InformacionBoletoController>(InformacionBoletoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
