import { Create_Usuario_DTO } from './../../../common/helpers/DTO.service';
import { IsString, IsPhoneNumber, MaxLength, Matches } from 'class-validator';

export class CreateUsuarioDto {

    @IsString()
    name: string;

    @IsString()
    lastname: string;

    @Matches(/^(\d{3})-(\d{3})-(\d{4})$/, {
        message: Create_Usuario_DTO.FORMATO_TELEFONO,
    })
    @MaxLength(12)
    phone: string;

    @IsString()
    address: string;
}
