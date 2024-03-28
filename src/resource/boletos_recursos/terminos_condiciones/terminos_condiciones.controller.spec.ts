import { Test, TestingModule } from '@nestjs/testing';
import { TerminosCondicionesController } from './terminos_condiciones.controller';
import { TerminosCondicionesService } from './terminos_condiciones.service';

describe('TerminosCondicionesController', () => {
  let controller: TerminosCondicionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TerminosCondicionesController],
      providers: [TerminosCondicionesService],
    }).compile();

    controller = module.get<TerminosCondicionesController>(TerminosCondicionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
