import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClinicaService } from './clinica.service';
import { CreateClinicaDto } from './dto/create-clinica.dto';
import { UpdateClinicaDto } from './dto/update-clinica.dto';

@Controller('clinicas')
export class ClinicaController {
  constructor(private readonly clinicaService: ClinicaService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createClinicaDto: CreateClinicaDto) {
    return this.clinicaService.create(createClinicaDto);
  }

  @Get()
  findAll() {
    return this.clinicaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicaService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(@Param('id') id: string, @Body() updateClinicaDto: UpdateClinicaDto) {
    return this.clinicaService.update(id, updateClinicaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clinicaService.remove(id);
  }
}
