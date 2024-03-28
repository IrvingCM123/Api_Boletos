import { Injectable } from '@nestjs/common';
import { CreateInformacionBoletoDto } from './dto/create-informacion_boleto.dto';
import { UpdateInformacionBoletoDto } from './dto/update-informacion_boleto.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User_Interface } from 'src/common/interfaces/user.interface';
import { validateOwnershipAdmin } from 'src/Guard/validateOwnerShip.guard';
import { plainToClass } from 'class-transformer';

import { InformacionBoleto } from './entities/informacion_boleto.entity';

import { CondicionesBoleto } from '../condiciones_boleto/entities/condiciones_boleto.entity';
import { InstruccionesAbordaje } from '../instrucciones_abordaje/entities/instrucciones_abordaje.entity';
import { TerminosCondicione } from '../terminos_condiciones/entities/terminos_condicione.entity';
import { InformacionCompañia } from '../informacion_compañia/entities/informacion_compañia.entity';
import { DocumentacionAbordaje } from '../documentacion_abordaje/entities/documentacion_abordaje.entity';
import { DatosEmergencia } from '../datos_emergencia/entities/datos_emergencia.entity';
import { InstruccionesSeguridad } from '../instrucciones_seguridad/entities/instrucciones_seguridad.entity';

@Injectable()
export class InformacionBoletoService {
  constructor(
    @InjectRepository(InformacionBoleto)
    private informacionBoletoRepository: Repository<InformacionBoleto>,
    @InjectRepository(CondicionesBoleto)
    private condicionesBoletoRepository: Repository<CondicionesBoleto>,
    @InjectRepository(InstruccionesAbordaje)
    private instruccionesAbordajeRepository: Repository<InstruccionesAbordaje>,
    @InjectRepository(TerminosCondicione)
    private terminosCondicionesRepository: Repository<TerminosCondicione>,
    @InjectRepository(InformacionCompañia)
    private informacionCompañiaRepository: Repository<InformacionCompañia>,
    @InjectRepository(DocumentacionAbordaje)
    private documentacionAbordajeRepository: Repository<DocumentacionAbordaje>,
    @InjectRepository(DatosEmergencia)
    private datosEmergenciaRepository: Repository<DatosEmergencia>,
    @InjectRepository(InstruccionesSeguridad)
    private instruccionesSeguridadRepository: Repository<InstruccionesSeguridad>,
  ) {}

  async create(
    createInformacionBoletoDto: CreateInformacionBoletoDto,
    user: User_Interface,
  ) {
    validateOwnershipAdmin(user);

    try {
      const informacionBoleto = plainToClass(
        InformacionBoleto,
        createInformacionBoletoDto,
      );

      return await this.informacionBoletoRepository.save(informacionBoleto);
    } catch (error) {
      throw new Error('No se pudo crear la información del boleto.');
    }
  }

  findAll(user: User_Interface) {
    validateOwnershipAdmin(user);
    return this.informacionBoletoRepository.find();
  }

  async findOne(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);

    try {
      let informacion: any = {};

      let informacionBoleto: any =  await this.informacionBoletoRepository.findOneById(id);

      informacion.informacion = [];

      let infor: any = {};

      const condicionesBoleto: any[] = [];

      for (const id of informacionBoleto.id_condicion_boleto) {
        const condicion = await this.condicionesBoletoRepository.findOne({
          where: { id_condicion_boleto: id },
        });
        if (condicion) {
          condicionesBoleto.push(condicion.condicion);
        }
      }

      infor.condiciones_boleto = condicionesBoleto;

      const instruccionesAbordaje: any[] = [];
      
      for (const id of informacionBoleto.id_instrucciones_abordaje) {
        const instruccion = await this.instruccionesAbordajeRepository.findOne({
          where: { id_instrucciones_abordaje: id },
        });
        if (instruccion) {
          instruccionesAbordaje.push(instruccion.Instruccion);
        }
      }

      infor.instrucciones_abordaje = instruccionesAbordaje;

      const terminosCondiciones: any[] = [];
      for (const id of informacionBoleto.id_terminos_condiciones) {
        const termino = await this.terminosCondicionesRepository.findOne({
          where: { id_terminos_condiciones: id },
        });
        if (termino) {
          terminosCondiciones.push(termino.terminos_condiciones);
        }
      }

      infor.terminos_condiciones = terminosCondiciones;

      const informacionCompañia: any[] = [];
      for (const id of informacionBoleto.id_informacion_compañia) {
        const informacion = await this.informacionCompañiaRepository.findOne({
          where: { id_informacion_compañia: id },
        });
        if (informacion) {
          informacionCompañia.push(informacion);
        }
      }

      infor.informacion_compañia = informacionCompañia;

      const documentacionAbordaje: any[] = [];
      for (const id of informacionBoleto.id_documentacion_abordaje) {
        const documentacion =
          await this.documentacionAbordajeRepository.findOne({
            where: { id_documentacion_abordaje: id },
          });
        if (documentacion) {
          documentacionAbordaje.push(documentacion.Documento);
        }
      }

      infor.documentacion_abordaje = documentacionAbordaje;

      const datosEmergencia: any[] = [];
      for (const id of informacionBoleto.id_dato_emergencia) {
        const dato = await this.datosEmergenciaRepository.findOne({
          where: { id_dato_emergencia: id },
        });
        if (dato) {
          datosEmergencia.push({
            nombre: dato.Nombre,
            descripcion: dato.Descripcion,
          });
        }
      }

      infor.datos_emergencia = datosEmergencia;

      const instruccionesSeguridad: any[] = [];
      for (const id of informacionBoleto.id_instrucciones_seguridad) {
        const instruccion = await this.instruccionesSeguridadRepository.findOne({
          where: { id_instrucciones_seguridad: id },
        });
        if (instruccion) {
          instruccionesSeguridad.push(instruccion.Instruccion);
        }
      }

      infor.instrucciones_seguridad = instruccionesSeguridad;

      informacion.informacion.push(infor);

      return informacion;
    } catch (error) {
      return {
        message: 'Error al registrar',
      };
    }
  }

  async update(
    id: number,
    updateInformacionBoletoDto: UpdateInformacionBoletoDto,
    user: User_Interface,
  ) {
    validateOwnershipAdmin(user);

    try {
      const informacionBoleto = plainToClass(
        InformacionBoleto,
        updateInformacionBoletoDto,
      );

      return {
        message: 'Existo en la actualización',
        data: await this.informacionBoletoRepository.update(
          id,
          informacionBoleto,
        ),
      };
    } catch (error) {
      return {
        message: 'Error al actualizar',
      };
    }
  }

  remove(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);
    try {
      return {
        message: 'Existo en la eliminación',
        data: this.informacionBoletoRepository.delete(id),
      };
    } catch (error) {
      return {
        message: 'Error al eliminar',
      };
    }
  }
}
