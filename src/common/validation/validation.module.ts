import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/resource/usuario/entities/usuario.entity';
import { Viaje } from 'src/resource/viaje/viaje/entities/viaje.entity';
import { UsuarioModule } from 'src/resource/usuario/usuario.module';
import { ViajeModule } from 'src/resource/viaje/viaje/viaje.module';
import { DetalleViaje } from 'src/resource/viaje/detalle_viaje/entities/detalle_viaje.entity';
import { DetalleViajeModule } from 'src/resource/viaje/detalle_viaje/detalle_viaje.module';
import { CatalogoDestino } from 'src/resource/catalogos/catalogo_destinos/entities/catalogo_destino.entity';
import { CatalogoDestinosModule } from 'src/resource/catalogos/catalogo_destinos/catalogo_destinos.module';
import { Cuenta } from 'src/resource/cuentas/entities/cuenta.entity';
import { CuentasModule } from 'src/resource/cuentas/cuentas.module';
import { Drivers_Validation } from './conductor_validar.service';
import { Destination_Validation } from './destination_validator.service';
import { Users_Validation } from './user_validator.service';
import { Vehicles_Validations } from './vehicle_validator.service';
import { ConductoresModule } from 'src/resource/conductores/conductores.module';
import { Conductore } from 'src/resource/conductores/entities/conductore.entity';
import { DetalleVehiculosModule } from 'src/resource/transportes/detalle_vehiculos/detalle_vehiculos.module';
import { DetalleVehiculo } from 'src/resource/transportes/detalle_vehiculos/entities/detalle_vehiculo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Viaje, DetalleViaje, CatalogoDestino, Cuenta, Conductore, DetalleVehiculo]),
    UsuarioModule,
    DetalleViajeModule,
    CatalogoDestinosModule,
    CuentasModule,
    ConductoresModule,
    DetalleVehiculosModule
  ],
  providers: [Drivers_Validation, Destination_Validation,Users_Validation, Vehicles_Validations ],
  exports: [Drivers_Validation, Destination_Validation,Users_Validation, Vehicles_Validations ]
})
export class ValidationModule {}
