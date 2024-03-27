import { Module } from '@nestjs/common';
import { DetalleViajeService } from './detalle_viaje.service';
import { DetalleViajeController } from './detalle_viaje.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleViaje } from './entities/detalle_viaje.entity';
import { CatalogoDestinosModule } from 'src/resource/catalogos/catalogo_destinos/catalogo_destinos.module';

@Module({
  imports : [TypeOrmModule.forFeature([DetalleViaje]), CatalogoDestinosModule],
  controllers: [DetalleViajeController],
  providers: [DetalleViajeService]
})
export class DetalleViajeModule {}
