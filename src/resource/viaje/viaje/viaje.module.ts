import { DetalleVehiculosModule } from './../../transportes/detalle_vehiculos/detalle_vehiculos.module';
import { Module } from '@nestjs/common';
import { ViajeService } from './viaje.service';
import { ViajeController } from './viaje.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Viaje } from './entities/viaje.entity';
import { DetalleViajeModule } from '../detalle_viaje/detalle_viaje.module';
import { ConductoresModule } from '../../conductores/conductores.module';

@Module({
  imports: [TypeOrmModule.forFeature([Viaje]), DetalleViajeModule, ConductoresModule, DetalleVehiculosModule],
  controllers: [ViajeController],
  providers: [ViajeService],
  exports: [ViajeService]
})
export class ViajeModule {}
