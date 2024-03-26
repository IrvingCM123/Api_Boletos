// Importaciones de módulos y clases necesarias
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from '../../common/constants/jwt.constant';

import { Errores_TOKEN } from 'src/common/helpers/Errores.service';

// Decorador Injectable indica que este servicio puede ser inyectado en otros componentes de NestJS
@Injectable()
export class AuthGuard implements CanActivate {
    // Inyección de dependencia de JwtService para utilizar funcionalidades de JWT
    constructor(private jwtService: JwtService) { }

    // Método que verifica si la solicitud está autorizada o no
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Extrae la solicitud del contexto de ejecución
        const request: any = context.switchToHttp().getRequest();

        // Extrae el token de autorización de la solicitud
        const token = this.extractToken(request);

        // Si no se encuentra el token, lanza una excepción de no autorizado
        if (!token) {
            throw new UnauthorizedException(Errores_TOKEN.AUTH_TOKEN_NOT_FOUND);
        }

        try {
            // Verifica y decodifica el token utilizando el servicio JwtService
            const payload = this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret,
            });

            // Asigna el usuario decodificado a la solicitud
            request.user = payload;

            // La solicitud está autorizada
            return true;
        } catch (error) {
            // Si hay un error al verificar el token, lanza una excepción de no autorizado
            throw new UnauthorizedException(Errores_TOKEN.AUTH_TOKEN_INVALID);
        }
    }

    // Método privado para extraer el token de autorización de la solicitud
    private extractToken(request: Request): string | undefined {
        // Obtiene el encabezado de autorización de la solicitud
        const authHeader = request.headers.authorization;

        // Si no hay encabezado de autorización, lanza una excepción de no autorizado
        if (!authHeader) {
            throw new UnauthorizedException(Errores_TOKEN.AUTH_TOKEN_NOT_FOUND);
        }

        // Divide el encabezado en dos partes: el esquema y el token
        const parts = authHeader.split(' ');

        // Si el encabezado no contiene dos partes, el token está mal formado
        if (parts.length !== 2) {
            throw new UnauthorizedException(Errores_TOKEN.AUTH_TOKEN_MALFORMED);
        }

        // Obtiene el esquema y el token del encabezado
        const [scheme, token] = parts;

        // Verifica que el esquema del token sea "Bearer"
        if (!/^Bearer$/i.test(scheme)) {
            throw new UnauthorizedException(Errores_TOKEN.AUTH_TOKEN_MALFORMED);
        }

        // Retorna el token extraído
        return token;
    }
}
