import { Conductore } from './entities/conductore.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Cuenta } from '../cuentas/entities/cuenta.entity';
import { Module } from '@nestjs/common';
import { ConductoresService } from './conductores.service';
import { ConductoresController } from './conductores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from '../usuario/usuario.module';
import { CuentasModule } from '../cuentas/cuentas.module';

@Module({
  imports: [TypeOrmModule.forFeature([Conductore, Usuario, Cuenta  ]), UsuarioModule, CuentasModule],
  controllers: [ConductoresController],
  providers: [ConductoresService],
  exports: [ConductoresService]
})
export class ConductoresModule {}
