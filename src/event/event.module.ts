import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { MessagesService } from 'src/messages/messages.service';
import { MessagesModule } from 'src/messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Conductore } from 'src/resource/conductores/entities/conductore.entity';
import { Viaje } from 'src/resource/viaje/viaje/entities/viaje.entity';
import { DetalleVehiculo } from 'src/resource/transportes/detalle_vehiculos/entities/detalle_vehiculo.entity';
import { ConductoresModule } from 'src/resource/conductores/conductores.module';
import { ViajeModule } from 'src/resource/viaje/viaje/viaje.module';
import { DetalleVehiculosModule } from 'src/resource/transportes/detalle_vehiculos/detalle_vehiculos.module';
import { Boleto } from 'src/resource/boletos/entities/boleto.entity';
import { Usuario } from 'src/resource/usuario/entities/usuario.entity';
import { BoletosModule } from 'src/resource/boletos/boletos.module';
import { UsuarioModule } from 'src/resource/usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, Conductore, Viaje, DetalleVehiculo, Boleto, Usuario]),
    MessagesModule,
    ConductoresModule,
    ViajeModule,
    DetalleVehiculosModule,
    BoletosModule,
    UsuarioModule,
  ],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
