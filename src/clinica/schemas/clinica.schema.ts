import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClinicaDocument = Clinica & Document;

@Schema({ timestamps: true })
export class Clinica {
  @Prop({ required: true })
  nome: string;

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

export const ClinicaSchema = SchemaFactory.createForClass(Clinica);
