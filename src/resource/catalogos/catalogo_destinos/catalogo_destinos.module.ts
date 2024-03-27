import { Module } from '@nestjs/common';
import { CatalogoDestinosService } from './catalogo_destinos.service';
import { CatalogoDestinosController } from './catalogo_destinos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogoDestino } from './entities/catalogo_destino.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CatalogoDestino])],
  controllers: [CatalogoDestinosController],
  providers: [CatalogoDestinosService],
  exports: [CatalogoDestinosService]
})
export class CatalogoDestinosModule {}
