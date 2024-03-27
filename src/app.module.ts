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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
