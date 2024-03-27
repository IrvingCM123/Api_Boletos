import { Module } from '@nestjs/common';
import { DetalleViajeService } from './detalle_viaje.service';
import { DetalleViajeController } from './detalle_viaje.controller';

@Module({
  controllers: [DetalleViajeController],
  providers: [DetalleViajeService]
})
export class DetalleViajeModule {}
