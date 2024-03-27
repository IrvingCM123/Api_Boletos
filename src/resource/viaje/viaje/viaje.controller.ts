import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ViajeService } from './viaje.service';
import { CreateViajeDto } from './dto/create-viaje.dto';
import { UpdateViajeDto } from './dto/update-viaje.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/user.decorator';
import { User_Interface } from 'src/common/interfaces/user.interface';

@Auth(Rol.ADMIN)
@Controller('viaje')
export class ViajeController {
  constructor(private readonly viajeService: ViajeService) {}

  @Post()
  create(@Body() createViajeDto: CreateViajeDto, @ActiveUser() user: User_Interface) {
    return this.viajeService.create(createViajeDto, user);
  }

  @Get()
  findAll( @ActiveUser() user: User_Interface) {
    return this.viajeService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.viajeService.findOne(+id, user );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateViajeDto: UpdateViajeDto, @ActiveUser() user: User_Interface) {
    return this.viajeService.update(+id, updateViajeDto, user );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.viajeService.remove(+id, user );
  }
}
