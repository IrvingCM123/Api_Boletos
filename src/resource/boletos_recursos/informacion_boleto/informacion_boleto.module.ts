import { Module } from '@nestjs/common';
import { InformacionBoletoService } from './informacion_boleto.service';
import { InformacionBoletoController } from './informacion_boleto.controller';

import { InformacionBoleto } from './entities/informacion_boleto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CondicionesBoleto } from '../condiciones_boleto/entities/condiciones_boleto.entity';
import { CondicionesBoletoModule } from '../condiciones_boleto/condiciones_boleto.module';
import { InstruccionesAbordaje } from '../instrucciones_abordaje/entities/instrucciones_abordaje.entity';
import { InstruccionesAbordajeModule } from '../instrucciones_abordaje/instrucciones_abordaje.module';
import { TerminosCondicione } from '../terminos_condiciones/entities/terminos_condicione.entity';
import { TerminosCondicionesModule } from '../terminos_condiciones/terminos_condiciones.module';
import { InformacionCompañia } from '../informacion_compañia/entities/informacion_compañia.entity';
import { InformacionCompañiaModule } from '../informacion_compañia/informacion_compañia.module';
import { DocumentacionAbordaje } from '../documentacion_abordaje/entities/documentacion_abordaje.entity';
import { DocumentacionAbordajeModule } from '../documentacion_abordaje/documentacion_abordaje.module';
import { DatosEmergencia } from '../datos_emergencia/entities/datos_emergencia.entity';
import { DatosEmergenciaModule } from '../datos_emergencia/datos_emergencia.module';
import { InstruccionesSeguridad } from '../instrucciones_seguridad/entities/instrucciones_seguridad.entity';
import { InstruccionesSeguridadModule } from '../instrucciones_seguridad/instrucciones_seguridad.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InformacionBoleto,
      CondicionesBoleto,
      InstruccionesAbordaje,
      TerminosCondicione,
      InformacionCompañia,
      DocumentacionAbordaje,
      DatosEmergencia,
      InstruccionesSeguridad,
    ]),
    CondicionesBoletoModule,
    InstruccionesAbordajeModule,
    TerminosCondicionesModule,
    InformacionCompañiaModule,
    DocumentacionAbordajeModule,
    DatosEmergenciaModule,
    InstruccionesSeguridadModule,
  ],
  controllers: [InformacionBoletoController],
  providers: [InformacionBoletoService],
  exports: [InformacionBoletoService],
})
export class InformacionBoletoModule {}
