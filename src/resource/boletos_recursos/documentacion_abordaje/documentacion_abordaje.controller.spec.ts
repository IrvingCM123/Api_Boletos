import { Test, TestingModule } from '@nestjs/testing';
import { DocumentacionAbordajeController } from './documentacion_abordaje.controller';
import { DocumentacionAbordajeService } from './documentacion_abordaje.service';

describe('DocumentacionAbordajeController', () => {
  let controller: DocumentacionAbordajeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentacionAbordajeController],
      providers: [DocumentacionAbordajeService],
    }).compile();

    controller = module.get<DocumentacionAbordajeController>(DocumentacionAbordajeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
