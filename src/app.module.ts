import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EstabelecimentoModule } from './estabelecimento/estabelecimento.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI ?? 'mongodb://localhost/estabelecimento-digital'),
    EstabelecimentoModule,
  ],
})
export class AppModule { }
