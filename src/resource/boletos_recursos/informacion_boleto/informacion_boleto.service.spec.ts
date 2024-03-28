import { Test, TestingModule } from '@nestjs/testing';
import { InformacionBoletoService } from './informacion_boleto.service';

describe('InformacionBoletoService', () => {
  let service: InformacionBoletoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InformacionBoletoService],
    }).compile();

    service = module.get<InformacionBoletoService>(InformacionBoletoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
