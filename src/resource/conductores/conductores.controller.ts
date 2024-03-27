import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConductoresService } from './conductores.service';
import { CreateConductoreDto } from './dto/create-conductore.dto';
import { UpdateConductoreDto } from './dto/update-conductore.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/user.decorator';
import { User_Interface } from 'src/common/interfaces/user.interface';

@Auth(Rol.ADMIN)
@Controller('conductores')
export class ConductoresController {
  constructor(private readonly conductoresService: ConductoresService) {}

  @Post()
  create(@Body() createConductoreDto: CreateConductoreDto, @ActiveUser() user: User_Interface) {
    return this.conductoresService.create(createConductoreDto, user);
  }

  @Get()
  findAll( @ActiveUser() user: User_Interface) {
    return this.conductoresService.findAll( user );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.conductoresService.findOne(+id, user );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConductoreDto: UpdateConductoreDto, @ActiveUser() user: User_Interface) {
    return this.conductoresService.update(+id, updateConductoreDto, user );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.conductoresService.remove(+id, user );
  }
}
