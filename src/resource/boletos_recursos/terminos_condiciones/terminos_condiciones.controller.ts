import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TerminosCondicionesService } from './terminos_condiciones.service';
import { CreateTerminosCondicioneDto } from './dto/create-terminos_condicione.dto';
import { UpdateTerminosCondicioneDto } from './dto/update-terminos_condicione.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/user.decorator';
import { User_Interface } from 'src/common/interfaces/user.interface';

@Auth(Rol.ADMIN)
@Controller('terminos-condiciones')
export class TerminosCondicionesController {
  constructor(private readonly terminosCondicionesService: TerminosCondicionesService) {}

  @Post()
  create(@Body() createTerminosCondicioneDto: CreateTerminosCondicioneDto, @ActiveUser() user: User_Interface) {
    return this.terminosCondicionesService.create(createTerminosCondicioneDto, user);
  }

  @Get()
  findAll( @ActiveUser() user: User_Interface) {
    return this.terminosCondicionesService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.terminosCondicionesService.findOne(+id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTerminosCondicioneDto: UpdateTerminosCondicioneDto, @ActiveUser() user: User_Interface) {
    return this.terminosCondicionesService.update(+id, updateTerminosCondicioneDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.terminosCondicionesService.remove(+id, user );
  }
}
