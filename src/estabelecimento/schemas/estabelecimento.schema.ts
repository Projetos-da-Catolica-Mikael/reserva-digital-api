import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EstabelecimentoDocument = Estabelecimento & Document;

@Schema({ timestamps: true })
export class Estabelecimento {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  tipo: string;

  @Prop({ required: true, unique: true })
  cnpj: string;

  @Prop()
  telefone: string;

  @Prop()
  email: string;

  @Prop()
  endereco: string;

  @Prop([String])
  especialidades: string[];

  @Prop({ default: true })
  ativo: boolean;
}

export const EstabelecimentoSchema = SchemaFactory.createForClass(Estabelecimento);
