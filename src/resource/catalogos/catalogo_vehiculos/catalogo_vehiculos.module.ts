import { Module } from '@nestjs/common';
import { CatalogoVehiculosService } from './catalogo_vehiculos.service';
import { CatalogoVehiculosController } from './catalogo_vehiculos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogoVehiculo } from './entities/catalogo_vehiculo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CatalogoVehiculo])],
  controllers: [CatalogoVehiculosController],
  providers: [CatalogoVehiculosService],
  exports: [CatalogoVehiculosService]
})
export class CatalogoVehiculosModule {}
