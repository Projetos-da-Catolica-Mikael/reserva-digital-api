import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EstabelecimentoController } from './estabelecimento.controller';
import { EstabelecimentoService } from './estabelecimento.service';
import { Estabelecimento, EstabelecimentoSchema } from './schemas/estabelecimento.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Estabelecimento.name, schema: EstabelecimentoSchema }]),
  ],
  controllers: [EstabelecimentoController],
  providers: [EstabelecimentoService],
})
export class EstabelecimentoModule { }
