import { SetMetadata } from "@nestjs/common";
import { Rol } from "src/common/enums/rol.enum";

export const Roles_Key = 'roles';
export const Roles = (rol: Rol) => SetMetadata(Roles_Key, rol);

