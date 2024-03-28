import { Module } from '@nestjs/common';
import { DetalleVehiculosService } from './detalle_vehiculos.service';
import { DetalleVehiculosController } from './detalle_vehiculos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleVehiculo } from './entities/detalle_vehiculo.entity';
import { CatalogoVehiculo } from 'src/resource/catalogos/catalogo_vehiculos/entities/catalogo_vehiculo.entity';


@Module({
  imports: [TypeOrmModule.forFeature([DetalleVehiculo, CatalogoVehiculo]), CatalogoVehiculo],
  controllers: [DetalleVehiculosController],
  providers: [DetalleVehiculosService],
  exports: [DetalleVehiculosService],
})
export class DetalleVehiculosModule {}
