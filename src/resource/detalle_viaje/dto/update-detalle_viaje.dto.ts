import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleViajeDto } from './create-detalle_viaje.dto';

export class UpdateDetalleViajeDto extends PartialType(CreateDetalleViajeDto) {}
