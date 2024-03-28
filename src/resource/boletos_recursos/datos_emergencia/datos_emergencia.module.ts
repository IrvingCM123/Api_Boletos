import { Module } from '@nestjs/common';
import { DatosEmergenciaService } from './datos_emergencia.service';
import { DatosEmergenciaController } from './datos_emergencia.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DatosEmergencia } from './entities/datos_emergencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DatosEmergencia])],
  controllers: [DatosEmergenciaController],
  providers: [DatosEmergenciaService],
  exports: [DatosEmergenciaService]
})
export class DatosEmergenciaModule {}
