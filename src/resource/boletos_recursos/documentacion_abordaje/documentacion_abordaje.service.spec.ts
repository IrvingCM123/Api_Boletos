import { Test, TestingModule } from '@nestjs/testing';
import { DocumentacionAbordajeService } from './documentacion_abordaje.service';

describe('DocumentacionAbordajeService', () => {
  let service: DocumentacionAbordajeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentacionAbordajeService],
    }).compile();

    service = module.get<DocumentacionAbordajeService>(DocumentacionAbordajeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
