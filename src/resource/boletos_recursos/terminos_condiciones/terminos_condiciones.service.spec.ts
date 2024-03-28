import { Test, TestingModule } from '@nestjs/testing';
import { TerminosCondicionesService } from './terminos_condiciones.service';

describe('TerminosCondicionesService', () => {
  let service: TerminosCondicionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TerminosCondicionesService],
    }).compile();

    service = module.get<TerminosCondicionesService>(TerminosCondicionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
