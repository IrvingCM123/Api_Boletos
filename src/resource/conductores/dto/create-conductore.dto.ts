import { IsString } from "class-validator";

export class CreateConductoreDto {

    @IsString() 
    Licencia: string;

    @IsString()
    email: string;

}
