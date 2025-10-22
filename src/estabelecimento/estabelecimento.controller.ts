import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEstabelecimentoDto } from './dto/create-estabelecimento.dto';
import { UpdateEstabelecimentoDto } from './dto/update-estabelecimento.dto';
import { EstabelecimentoService } from './estabelecimento.service';

@ApiTags('Estabelecimentos')
@Controller('estabelecimentos')
export class EstabelecimentoController {
  constructor(private readonly estabelecimentoService: EstabelecimentoService) { }

  @Get()
  @ApiOperation({ summary: 'Lista todos os estabelecimentos' })
  findAll() {
    return this.estabelecimentoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um estabelecimento pelo ID' })
  findOne(@Param('id') id: string) {
    return this.estabelecimentoService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo estabelecimento' })
  @ApiResponse({ status: 201, description: 'Estabelecimento criada com sucesso' })
  create(@Body() createEstabelecimentoDto: CreateEstabelecimentoDto) {
    return this.estabelecimentoService.create(createEstabelecimentoDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um estabelecimento existente' })
  update(@Param('id') id: string, @Body() updateEstabelecimentoDto: UpdateEstabelecimentoDto) {
    return this.estabelecimentoService.update(id, updateEstabelecimentoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um estabelecimento' })
  remove(@Param('id') id: string) {
    return this.estabelecimentoService.remove(id);
  }
}
