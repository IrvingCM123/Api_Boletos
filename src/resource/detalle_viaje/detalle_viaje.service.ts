import { Injectable } from '@nestjs/common';
import { CreateDetalleViajeDto } from './dto/create-detalle_viaje.dto';
import { UpdateDetalleViajeDto } from './dto/update-detalle_viaje.dto';

@Injectable()
export class DetalleViajeService {
  create(createDetalleViajeDto: CreateDetalleViajeDto) {
    return 'This action adds a new detalleViaje';
  }

  findAll() {
    return `This action returns all detalleViaje`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detalleViaje`;
  }

  update(id: number, updateDetalleViajeDto: UpdateDetalleViajeDto) {
    return `This action updates a #${id} detalleViaje`;
  }

  remove(id: number) {
    return `This action removes a #${id} detalleViaje`;
  }
}
