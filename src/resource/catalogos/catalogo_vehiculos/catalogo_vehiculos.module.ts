import { Module } from '@nestjs/common';
import { CatalogoVehiculosService } from './catalogo_vehiculos.service';
import { CatalogoVehiculosController } from './catalogo_vehiculos.controller';

@Module({
  controllers: [CatalogoVehiculosController],
  providers: [CatalogoVehiculosService],
  exports: [CatalogoVehiculosService]
})
export class CatalogoVehiculosModule {}
