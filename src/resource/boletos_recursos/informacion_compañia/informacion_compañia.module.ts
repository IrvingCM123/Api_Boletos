import { Module } from '@nestjs/common';
import { InformacionCompañiaService } from './informacion_compañia.service';
import { InformacionCompañiaController } from './informacion_compañia.controller';

import { InformacionCompañia } from './entities/informacion_compañia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([InformacionCompañia])],
  controllers: [InformacionCompañiaController],
  providers: [InformacionCompañiaService],
  exports: [InformacionCompañiaService]
})
export class InformacionCompañiaModule {}
