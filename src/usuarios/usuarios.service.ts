import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario, UsuarioDocument, UsuarioRole } from './schemas/usuario.schema';

@Injectable()
export class UsuariosService {
  constructor(@InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>) { }

  async create(createUsuarioDto: CreateUsuarioDto) {
    const existing = await this.usuarioModel.findOne({ email: createUsuarioDto.email });
    if (existing) throw new BadRequestException('Email já cadastrado');

    const hashed = await bcrypt.hash(createUsuarioDto.password, 10);
    const created = new this.usuarioModel({ ...createUsuarioDto, password: hashed, role: UsuarioRole.USUARIO });
    return created.save();
  }

  async findByEmail(email: string) {
    return this.usuarioModel.findOne({ email }).exec();
  }

  async findById(id: string) {
    const usuario = await this.usuarioModel.findById(id).exec();
    if (!usuario) throw new NotFoundException('Usuário não encontrado');
    return usuario;
  }
}
