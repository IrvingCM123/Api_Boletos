import { Module } from '@nestjs/common';
import { CatalogoIncidentesService } from './catalogo_incidentes.service';
import { CatalogoIncidentesController } from './catalogo_incidentes.controller';

@Module({
  controllers: [CatalogoIncidentesController],
  providers: [CatalogoIncidentesService],
  exports: [CatalogoIncidentesService],
})
export class CatalogoIncidentesModule {}
