import { UsuarioModule } from './resource/usuario/usuario.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CuentasModule } from './resource/cuentas/cuentas.module';
import { CatalogoCategoriasModule } from './resource/catalogo_categorias/catalogo_categorias.module';
import { MessagesModule } from './messages/messages.module';
import { EventosAlertsModule } from './eventos_alerts/eventos_alerts.module';
import { EventModule } from './event/event.module';

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
    CatalogoCategoriasModule,
    MessagesModule,
    EventosAlertsModule,
    EventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
