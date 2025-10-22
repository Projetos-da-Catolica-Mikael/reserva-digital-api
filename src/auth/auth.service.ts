import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(private usuariosService: UsuariosService, private jwtService: JwtService) { }

  async validateUsuario(email: string, pass: string) {
    const usuario = await this.usuariosService.findByEmail(email);
    if (!usuario) return null;
    const matches = await bcrypt.compare(pass, usuario.password);
    if (matches) {
      const { password, ...result } = usuario.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: user._id, email: user.email, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }
}
