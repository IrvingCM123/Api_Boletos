import { Module } from '@nestjs/common';
import { CondicionesBoletoService } from './condiciones_boleto.service';
import { CondicionesBoletoController } from './condiciones_boleto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CondicionesBoleto } from './entities/condiciones_boleto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CondicionesBoleto])],
  controllers: [CondicionesBoletoController],
  providers: [CondicionesBoletoService],
  exports: [CondicionesBoletoService]
})
export class CondicionesBoletoModule {}
