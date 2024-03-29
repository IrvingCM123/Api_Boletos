import { applyDecorators, UseGuards } from '@nestjs/common';
import { Rol } from 'src/common/enums/rol.enum';
import { AuthGuard } from '../guard/auth.guard';
import { RoleGuard } from '../guard/role.guard';
import { Roles } from './roles.decorator';

export function Auth(roles: Rol) {
  return applyDecorators(Roles(roles), UseGuards(AuthGuard, RoleGuard));
}


export function AuthAll(roles: any[]) {

  const decorators = [];

  for (const role of roles) {
    console.log('role', role);
      decorators.push(
          Roles(role), // Assuming Roles is a decorator function
          UseGuards(AuthGuard, RoleGuard) // Assuming AuthGuard and RoleGuard are guards
      );
  }

  return applyDecorators(...decorators);
}
