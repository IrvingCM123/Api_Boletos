import { Module } from '@nestjs/common';
import { TerminosCondicionesService } from './terminos_condiciones.service';
import { TerminosCondicionesController } from './terminos_condiciones.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminosCondicione } from './entities/terminos_condicione.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TerminosCondicione])],
  controllers: [TerminosCondicionesController],
  providers: [TerminosCondicionesService],
  exports: [TerminosCondicionesService]
})
export class TerminosCondicionesModule {}
