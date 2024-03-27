import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import {
    Errores_USUARIO,
    Errores_Cuentas,
} from 'src/common/helpers/Errores.service';
import {
    Exito_Usuarios,
    Exito_Cuentas,
} from 'src/common/helpers/Confirmaciones.service';

import { Usuario } from 'src/resource/usuario/entities/usuario.entity';
import { UsuarioService } from 'src/resource/usuario/usuario.service';

import { Cuenta } from 'src/resource/cuentas/entities/cuenta.entity';
import { CuentasService } from 'src/resource/cuentas/cuentas.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Connection } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private cuentasService: CuentasService,
        private jwtService: JwtService,
        private connection: Connection,
    ) { }

    async register(registroDTO: RegisterDto) {
        const { email, password, name, lastname, phone, address, token_notificacion } = registroDTO;

        const date_created = new Date();

        const user = await this.cuentasService.findOneByEmail(email);

        if (user) {
            throw new BadRequestException(Errores_USUARIO.USUARIO_DUPLICATED);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const usuario: any = await this.usuarioService.create({
                name,
                lastname,
                phone,
                address,
                token_notificacion,
            });

            await this.cuentasService.create({
                email,
                password: hashedPassword,
                date_created,
                id_usuario: usuario.id_usuario,
            });

            await queryRunner.commitTransaction();

            return { name, email, message: Exito_Usuarios.USUARIO_CREADO };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new BadRequestException(Errores_Cuentas.CUENTA_NOT_CREATED);
        } finally {
            await queryRunner.release();
        }
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const cuenta: any = await this.cuentasService.findByEmailWithPassword(
            email,
        );

        if (!cuenta) {
            throw new UnauthorizedException(Errores_USUARIO.USUARIO_NOT_FOUND);
        }

        if (!(await bcrypt.compare(password, cuenta.cuenta.password))) {
            throw new UnauthorizedException(Errores_USUARIO.USUARIO_INVALID);
        }

        const payload = { email: cuenta.cuenta.email, role: cuenta.usuario.role };

        const access_token = await this.jwtService.signAsync(payload);

        return {
            access_token,
            email,
            role: cuenta.usuario.role,
            message: Exito_Usuarios.Sesion_Activa,
        };
    }

    async profile({ email, role }: { email: string; role: string }) {
        return await this.cuentasService.findOneByEmail(email);
    }
}
