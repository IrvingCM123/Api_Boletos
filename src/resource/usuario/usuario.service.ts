import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User_Interface } from 'src/common/interfaces/user.interface';
import { Cuenta } from '../cuentas/entities/cuenta.entity';
@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Cuenta)
    private cuentaRepository: Repository<Cuenta>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<number> {
    const usuario: any = await this.usuarioRepository.save(createUsuarioDto);
    return usuario;
  }

  findAll() {
    return this.usuarioRepository.find();
  }

  findOne(id: number) {
    return this.usuarioRepository.findOneById(id);
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioRepository.update(id, updateUsuarioDto);
  }

  async updateTokenByEmail(
    email: string,
    token: string,
    user: User_Interface,
  ) {
    try {

      let cuenta = await this.cuentaRepository
      .createQueryBuilder('cuenta')
      .leftJoinAndSelect('cuenta.id_usuario', 'usuario')
      .where('cuenta.email = :email', { email })
      .getOne();

      let actualizar = await this.usuarioRepository
        .createQueryBuilder()
        .update(Usuario)
        .set({ token_notificacion: token })
        .where('id_usuario = :id_usuario', { id_usuario: cuenta.id_usuario.id_usuario })
        .execute();

      return 'Token actualizado correctamente';
    } catch (error) {
      return 'Error al actualizar el token';
    }
  }

  remove(id: number) {
    return this.usuarioRepository.delete(id);
  }
}
