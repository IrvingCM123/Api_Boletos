import { Test, TestingModule } from '@nestjs/testing';
import { CondicionesBoletoService } from './condiciones_boleto.service';

describe('CondicionesBoletoService', () => {
  let service: CondicionesBoletoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CondicionesBoletoService],
    }).compile();

    service = module.get<CondicionesBoletoService>(CondicionesBoletoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
