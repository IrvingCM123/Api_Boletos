import { Module } from '@nestjs/common';
import { InstruccionesAbordajeService } from './instrucciones_abordaje.service';
import { InstruccionesAbordajeController } from './instrucciones_abordaje.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { InstruccionesAbordaje } from './entities/instrucciones_abordaje.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InstruccionesAbordaje])],
  controllers: [InstruccionesAbordajeController],
  providers: [InstruccionesAbordajeService],
  exports: [InstruccionesAbordajeService]
})
export class InstruccionesAbordajeModule {}
