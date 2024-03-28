import { Module } from '@nestjs/common';
import { CatalogoIncidentesService } from './catalogo_incidentes.service';
import { CatalogoIncidentesController } from './catalogo_incidentes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogoIncidente } from './entities/catalogo_incidente.entity';
@Module({
  imports: [TypeOrmModule.forFeature([CatalogoIncidente])],
  controllers: [CatalogoIncidentesController],
  providers: [CatalogoIncidentesService],
  exports: [CatalogoIncidentesService],
})
export class CatalogoIncidentesModule {}
