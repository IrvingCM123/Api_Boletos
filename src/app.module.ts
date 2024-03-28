import { UsuarioModule } from './resource/usuario/usuario.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CuentasModule } from './resource/cuentas/cuentas.module';
import { MessagesModule } from './messages/messages.module';
import { EventModule } from './event/event.module';
import { CatalogoDestinosModule } from './resource/catalogos/catalogo_destinos/catalogo_destinos.module';
import { CatalogoCategoria } from './resource/catalogos/catalogo_categorias/entities/catalogo_categoria.entity';
import { CatalogoCategoriasModule } from './resource/catalogos/catalogo_categorias/catalogo_categorias.module';
import { CatalogoIncidentesModule } from './resource/catalogos/catalogo_incidentes/catalogo_incidentes.module';
import { CatalogoVehiculosModule } from './resource/catalogos/catalogo_vehiculos/catalogo_vehiculos.module';
import { DetalleVehiculosModule } from './resource/transportes/detalle_vehiculos/detalle_vehiculos.module';
import { DetalleViajeModule } from './resource/viaje/detalle_viaje/detalle_viaje.module';
import { ConductoresModule } from './resource/conductores/conductores.module';
import { ViajeModule } from './resource/viaje/viaje/viaje.module';
import { CondicionesBoletoModule } from './resource/boletos_recursos/condiciones_boleto/condiciones_boleto.module';
import { DatosEmergenciaModule } from './resource/boletos_recursos/datos_emergencia/datos_emergencia.module';
import { InformacionCompañiaModule } from './resource/boletos_recursos/informacion_compañia/informacion_compañia.module';
import { DocumentacionAbordajeModule } from './resource/boletos_recursos/documentacion_abordaje/documentacion_abordaje.module';
import { InstruccionesAbordajeModule } from './resource/boletos_recursos/instrucciones_abordaje/instrucciones_abordaje.module';
import { InstruccionesSeguridadModule } from './resource/boletos_recursos/instrucciones_seguridad/instrucciones_seguridad.module';
import { TerminosCondicionesModule } from './resource/boletos_recursos/terminos_condiciones/terminos_condiciones.module';
import { BoletosModule } from './resource/boletos/boletos.module';
import { InformacionBoletoModule } from './resource/boletos_recursos/informacion_boleto/informacion_boleto.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-mute-grass-a5yv0kt7-pooler.us-east-2.aws.neon.tech',
      port: 5432,
      username: 'neondb_owner',
      password: 'I8l0nUFHumXy',
      database: 'db_crud',
      autoLoadEntities: true,
      synchronize: true,
      extra: {
        ssl: true,
        sslmode: 'require',
      },
    }),
    UsuarioModule,
    CuentasModule,
    AuthModule,
    MessagesModule,
    EventModule,
    CatalogoDestinosModule,
    CatalogoCategoriasModule,
    CatalogoIncidentesModule,
    CatalogoVehiculosModule,
    DetalleVehiculosModule,
    DetalleViajeModule,
    ConductoresModule,
    ViajeModule,
    CondicionesBoletoModule,
    DatosEmergenciaModule,
    InformacionCompañiaModule,
    DocumentacionAbordajeModule,
    InstruccionesAbordajeModule,
    InstruccionesSeguridadModule,
    TerminosCondicionesModule,
    BoletosModule,
    InformacionBoletoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
