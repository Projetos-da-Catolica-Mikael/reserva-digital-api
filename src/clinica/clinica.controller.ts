import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClinicaService } from './clinica.service';
import { CreateClinicaDto } from './dto/create-clinica.dto';
import { UpdateClinicaDto } from './dto/update-clinica.dto';

@ApiTags('clinicas')
@Controller('clinicas')
export class ClinicaController {
  constructor(private readonly clinicaService: ClinicaService) { }

  @Get()
  @ApiOperation({ summary: 'Lista todas as clínicas' })
  findAll() {
    return this.clinicaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma clínica pelo ID' })
  findOne(@Param('id') id: string) {
    return this.clinicaService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria uma nova clínica' })
  @ApiResponse({ status: 201, description: 'Clínica criada com sucesso' })
  create(@Body() createClinicaDto: CreateClinicaDto) {
    return this.clinicaService.create(createClinicaDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma clínica existente' })
  update(@Param('id') id: string, @Body() updateClinicaDto: UpdateClinicaDto) {
    return this.clinicaService.update(id, updateClinicaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma clínica' })
  remove(@Param('id') id: string) {
    return this.clinicaService.remove(id);
  }
}
