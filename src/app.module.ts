import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { EstabelecimentoModule } from './estabelecimento/estabelecimento.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI ?? 'mongodb://localhost/estabelecimento-digital'),
    EstabelecimentoModule,
    UsuariosModule,
    AuthModule,
  ],
})
export class AppModule { }
