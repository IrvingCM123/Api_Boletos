import { Module } from '@nestjs/common';
import { DocumentacionAbordajeService } from './documentacion_abordaje.service';
import { DocumentacionAbordajeController } from './documentacion_abordaje.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentacionAbordaje } from './entities/documentacion_abordaje.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentacionAbordaje])],
  controllers: [DocumentacionAbordajeController],
  providers: [DocumentacionAbordajeService],
  exports: [DocumentacionAbordajeService]
})
export class DocumentacionAbordajeModule {}
