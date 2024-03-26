import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsString, IsPhoneNumber, MaxLength, Matches } from 'class-validator';
import { Create_Usuario_DTO } from 'src/common/helpers/DTO.service';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    
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
