import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  
  import { Reflector } from '@nestjs/core'; // Provides access to controller and method metadata
  import { Rol } from 'src/common/enums/rol.enum'; // Import role enumerator
  import { Roles_Key } from '../decorators/roles.decorator'; // Import roles decorator
  import { Errores_Roles } from 'src/common/helpers/Errores.service'; // Import error service related to roles
  
  /**
   * Authentication guard that validates user roles.
   */
  @Injectable()
  export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {} // Inyecta el servicio Reflector para acceder a los metadatos de los controladores y los controladores de método
  
    /**
     * canActivate method to validate user roles.
     * @param context Execution context.
     * @returns Boolean indicating whether the request is allowed or not.
     */
    async canActivate(context: ExecutionContext): Promise<boolean> {
      // Get the required roles from the Roles_Key decorator defined in the controller or method
      const roles = await this.reflector.getAllAndOverride<Rol>(Roles_Key, [
        context.getHandler(),
        context.getClass(),
      ]);
  
      // Get the HTTP request from the execution context
      const user = await context.switchToHttp().getRequest().user;
  
      if (!user) {
        // If there is no user in the request, throw an UnauthorizedException
        throw new UnauthorizedException(Errores_Roles.ROLE_NOT_FOUND);
      }
  
      let validar = false;
      const valoresEnum = Object.values(Rol);
      for (let valor of valoresEnum) {
        if (user.role === valor) {
          return (validar = true);
        } else {
          validar = false;
        }
      }
  
      if (validar === false) {
        throw new UnauthorizedException(Errores_Roles.ROLE_INVALID);
      }
  
      return roles === user.role; // Returns true if the required roles match the user's role
    }
  }
  