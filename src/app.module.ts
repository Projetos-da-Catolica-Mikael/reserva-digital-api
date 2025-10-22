import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EstabelecimentoModule } from './estabelecimento/estabelecimento.module';
import { PacienteModule } from './paciente/paciente.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI ?? 'mongodb://localhost/estabelecimento-digital'),
    EstabelecimentoModule,
    PacienteModule,
  ],
})
export class AppModule { }
