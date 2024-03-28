import {
    Injectable, // Importa Injectable para definir un servicio que puede ser inyectado en otros componentes de NestJS
    CanActivate, // Importa CanActivate para crear un guardia de autenticación
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common'; // Importa los módulos necesarios de NestJS

import { Reflector } from '@nestjs/core'; // Importa Reflector para acceder a los metadatos de los controladores y los controladores de método
import { Rol } from 'src/common/enums/rol.enum'; // Importa el enumerador de roles
import { Roles_Key } from '../decorators/roles.decorator'; // Importa el decorador de roles
import { Errores_Roles } from 'src/common/helpers/Errores.service'; // Importa el servicio de errores relacionados con los roles

// Decorador Injectable indica que este servicio puede ser inyectado en otros componentes de NestJS
@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) {} // Inyecta el servicio Reflector para acceder a los metadatos de los controladores y los controladores de método

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Obtiene los roles requeridos del decorador Roles_Key definido en el controlador o método
        const roles = await this.reflector.getAllAndOverride<Rol>(Roles_Key, [
            context.getHandler(), // Obtén los roles definidos en el controlador de método
            context.getClass(), // Obtén los roles definidos en el controlador
        ]);

        // Obtiene la solicitud HTTP del contexto de ejecución
        const user = await context.switchToHttp().getRequest().user;

        if (!user) {
            // Si no hay usuario en la solicitud, lanza una excepción de no autorizado
            throw new UnauthorizedException(Errores_Roles.ROLE_NOT_FOUND);
        }

        let validar = false;
        const valoresEnum = Object.values(Rol);
        for (let valor of valoresEnum) {
            if (user.role === valor) {
                return validar = true;
            } else {
                validar = false;
            }
        }

        if (validar === false) {
            throw new UnauthorizedException(Errores_Roles.ROLE_INVALID)
        }

        return roles === user.role; // Retorna true si los roles requeridos coinciden con el rol del usuario
    }
}
