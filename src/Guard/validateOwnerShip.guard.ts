import { UnauthorizedException } from '@nestjs/common';
import { Rol } from 'src/common/enums/rol.enum';
import { Errores_Roles } from 'src/common/helpers/Errores.service';
import { User_Interface } from 'src/common/interfaces/user.interface';


/**
 * Validates if the user has the standard user role.
 * @param user The user object to be validated.
 * @throws UnauthorizedException If the user does not have the user role.
 * @returns True if the user has the user role.
 */
export function validateOwnershipUser(user: User_Interface) {
  if (user.role !== Rol.USER) {
    throw new UnauthorizedException(Errores_Roles.ROLE_UNAUTHORIZED);
  } else {
    return true;
  }
}

/**
 * Validates if the user has the administrator role.
 * @param user The user object to be validated.
 * @throws UnauthorizedException If the user does not have the administrator role.
 * @returns True if the user has the administrator role.
 */
export function validateOwnershipAdmin(user: User_Interface) {
  if (user.role !== Rol.ADMIN) {
    throw new UnauthorizedException(Errores_Roles.ROLE_UNAUTHORIZED);
  } else {
    return true;
  }
}

/**
 * Validates if the user has any of the allowed roles (user or administrator).
 * @param user The user object to be validated.
 * @throws UnauthorizedException If the user does not have any of the allowed roles.
 * @returns True if the user has any of the allowed roles.
 */
export function validateOwnershipAll(user: User_Interface) {
  if (user.role === Rol.ADMIN) {
    return true;
  }

  if (user.role === Rol.USER) {
    return true;
  }

  if (user.role !== Rol.ADMIN && user.role !== Rol.USER) {
    throw new UnauthorizedException(Errores_Roles.ROLE_UNAUTHORIZED);
  }
}
