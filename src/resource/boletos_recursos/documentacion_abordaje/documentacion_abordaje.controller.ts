import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocumentacionAbordajeService } from './documentacion_abordaje.service';
import { CreateDocumentacionAbordajeDto } from './dto/create-documentacion_abordaje.dto';
import { UpdateDocumentacionAbordajeDto } from './dto/update-documentacion_abordaje.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/user.decorator';
import { User_Interface } from 'src/common/interfaces/user.interface';

@Auth(Rol.ADMIN)
@Controller('documentacion-abordaje')
export class DocumentacionAbordajeController {
  constructor(private readonly documentacionAbordajeService: DocumentacionAbordajeService) {}

  @Post()
  create(@Body() createDocumentacionAbordajeDto: CreateDocumentacionAbordajeDto, @ActiveUser() user: User_Interface) {
    return this.documentacionAbordajeService.create(createDocumentacionAbordajeDto, user);
  }

  @Get()
  findAll( @ActiveUser() user: User_Interface) {
    return this.documentacionAbordajeService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.documentacionAbordajeService.findOne(+id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocumentacionAbordajeDto: UpdateDocumentacionAbordajeDto, @ActiveUser() user: User_Interface) {
    return this.documentacionAbordajeService.update(+id, updateDocumentacionAbordajeDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.documentacionAbordajeService.remove(+id, user);
  }
}
