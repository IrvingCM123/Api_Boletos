import { UsuarioModule } from './resource/usuario/usuario.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CuentasModule } from './resource/cuentas/cuentas.module';
import { CatalogoCategoriasModule } from './resource/catalogo_categorias/catalogo_categorias.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'IrvingConde123',
      database: 'db_crud',
      autoLoadEntities: true,
      synchronize: true,
    }), 
    UsuarioModule,
    CuentasModule,
    AuthModule,
    CatalogoCategoriasModule,
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
