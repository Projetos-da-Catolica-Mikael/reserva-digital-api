import { Body, Controller, Post } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) { }

  @Post('register')
  async register(@Body() dto: CreateUsuarioDto) {
    const usuario = await this.usuariosService.create(dto);
    const { password, ...rest } = usuario.toObject();
    return rest;
  }
}
