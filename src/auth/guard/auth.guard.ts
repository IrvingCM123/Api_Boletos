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

// Injectable decorator indicates that this service can be injected into other NestJS components
@Injectable()
export class AuthGuard implements CanActivate {
    // Dependency injection of JwtService to utilize JWT functionalities
    constructor(private jwtService: JwtService) { }

    // Method to verify if the request is authorized or not
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Extract request from execution context
        const request: any = context.switchToHttp().getRequest();

        // Extract authorization token from request
        const token = this.extractToken(request);

        // If token is not found, throw an unauthorized exception
        if (!token) {
            throw new UnauthorizedException(Errores_TOKEN.AUTH_TOKEN_NOT_FOUND);
        }

        try {
            // Verify and decode token using JwtService
            const payload = this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret,
            });

            // Assign decoded user to request
            request.user = payload;

            // Request is authorized
            return true;
        } catch (error) {
            // If there is an error verifying the token, throw an unauthorized exception
            throw new UnauthorizedException(Errores_TOKEN.AUTH_TOKEN_INVALID);
        }
    }

    // Private method to extract authorization token from request
    private extractToken(request: Request): string | undefined {
        // Get authorization header from request
        const authHeader = request.headers.authorization;

        // If there is no authorization header, throw an unauthorized exception
        if (!authHeader) {
            throw new UnauthorizedException(Errores_TOKEN.AUTH_TOKEN_NOT_FOUND);
        }

        // Split header into two parts: scheme and token
        const parts = authHeader.split(' ');

        // If header does not contain two parts, token is malformed
        if (parts.length !== 2) {
            throw new UnauthorizedException(Errores_TOKEN.AUTH_TOKEN_MALFORMED);
        }

        // Get scheme and token from header
        const [scheme, token] = parts;

        // Verify that token scheme is "Bearer"
        if (!/^Bearer$/i.test(scheme)) {
            throw new UnauthorizedException(Errores_TOKEN.AUTH_TOKEN_MALFORMED);
        }

        // Return extracted token
        return token;
    }
}
