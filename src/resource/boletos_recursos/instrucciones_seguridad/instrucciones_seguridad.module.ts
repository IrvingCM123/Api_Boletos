import { Module } from '@nestjs/common';
import { InstruccionesSeguridadService } from './instrucciones_seguridad.service';
import { InstruccionesSeguridadController } from './instrucciones_seguridad.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { InstruccionesSeguridad } from './entities/instrucciones_seguridad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InstruccionesSeguridad])],
  controllers: [InstruccionesSeguridadController],
  providers: [InstruccionesSeguridadService],
  exports: [InstruccionesSeguridadService]
})
export class InstruccionesSeguridadModule {}
