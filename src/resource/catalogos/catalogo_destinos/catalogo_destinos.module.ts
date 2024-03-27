import { Module } from '@nestjs/common';
import { CatalogoDestinosService } from './catalogo_destinos.service';
import { CatalogoDestinosController } from './catalogo_destinos.controller';

@Module({
  controllers: [CatalogoDestinosController],
  providers: [CatalogoDestinosService],
  exports: [CatalogoDestinosService]
})
export class CatalogoDestinosModule {}
