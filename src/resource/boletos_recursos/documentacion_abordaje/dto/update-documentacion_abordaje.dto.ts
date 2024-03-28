import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentacionAbordajeDto } from './create-documentacion_abordaje.dto';

import { IsString, MaxLength } from "class-validator";

export class UpdateDocumentacionAbordajeDto extends PartialType(CreateDocumentacionAbordajeDto) {

    @IsString()
    @MaxLength(60)
    Documento : string;
}
