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
import { DetalleViaje } from '../viaje/detalle_viaje/entities/detalle_viaje.entity';
import { DetalleViajeModule } from '../viaje/detalle_viaje/detalle_viaje.module';
import { CatalogoDestino } from '../catalogos/catalogo_destinos/entities/catalogo_destino.entity';
import { CatalogoDestinosModule } from '../catalogos/catalogo_destinos/catalogo_destinos.module';
import { Cuenta } from '../cuentas/entities/cuenta.entity';
import { CuentasModule } from '../cuentas/cuentas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Boleto, InformacionBoleto, Usuario, Viaje, DetalleViaje, CatalogoDestino, Cuenta]),
    InformacionBoletoModule,
    UsuarioModule,
    ViajeModule,
    DetalleViajeModule,
    CatalogoDestinosModule,
    CuentasModule
  ],
  controllers: [BoletosController],
  providers: [BoletosService],
  exports: [BoletosService]
})
export class BoletosModule {}
