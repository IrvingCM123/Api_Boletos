import { Module } from '@nestjs/common';
import { BoletosService } from './boletos.service';
import { BoletosController } from './boletos.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Boleto } from './entities/boleto.entity';
import { InformacionBoleto } from 'src/resource/boletos_recursos/informacion_boleto/entities/informacion_boleto.entity';
import { Usuario } from 'src/resource/usuario/entities/usuario.entity';
import { Viaje } from 'src/resource/viaje/viaje/entities/viaje.entity';
import { InformacionBoletoModule } from './../boletos_recursos/informacion_boleto/informacion_boleto.module';
import { UsuarioModule } from 'src/resource/usuario/usuario.module';
import { ViajeModule } from '../viaje/viaje/viaje.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Boleto, InformacionBoleto, Usuario, Viaje]),
    InformacionBoletoModule,
    UsuarioModule,
    ViajeModule
  ],
  controllers: [BoletosController],
  providers: [BoletosService],
  exports: [BoletosService]
})
export class BoletosModule {}
