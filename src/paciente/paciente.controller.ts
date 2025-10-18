import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { PacienteService } from './paciente.service';

@ApiTags('pacientes')
@Controller('pacientes')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) { }

  @Get()
  @ApiOperation({ summary: 'Lista todos os pacientes' })
  findAll() {
    return this.pacienteService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um paciente pelo ID' })
  findOne(@Param('id') id: string) {
    return this.pacienteService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo paciente' })
  @ApiResponse({ status: 201, description: 'Paciente criado com sucesso' })
  create(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacienteService.create(createPacienteDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um paciente existente' })
  update(@Param('id') id: string, @Body() updatePacienteDto: UpdatePacienteDto) {
    return this.pacienteService.update(id, updatePacienteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um paciente' })
  remove(@Param('id') id: string) {
    return this.pacienteService.remove(id);
  }
}
