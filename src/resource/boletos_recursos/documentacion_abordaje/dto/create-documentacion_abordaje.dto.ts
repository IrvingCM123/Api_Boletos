import { IsString, MaxLength } from "class-validator";

export class CreateDocumentacionAbordajeDto {

    @IsString()
    @MaxLength(60)
    Documento : string;

}
