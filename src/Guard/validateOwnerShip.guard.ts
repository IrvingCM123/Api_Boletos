import { UnauthorizedException } from '@nestjs/common';
import { Rol } from 'src/common/enums/rol.enum';
import { Errores_Roles } from 'src/common/helpers/Errores.service';
import { User_Interface } from 'src/common/interfaces/user.interface';

export function validateOwnership(user: User_Interface) {
  if (user.role !== Rol.USER) {
    throw new UnauthorizedException(Errores_Roles.ROLE_UNAUTHORIZED);
  } else {
    return true;
  }
}
