import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PacienteDocument = Paciente & Document;

@Schema({ timestamps: true })
export class Paciente {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true, unique: true })
  cpf: string;

  @Prop()
  telefone: string;

  @Prop()
  email: string;

  @Prop()
  endereco: string;

  @Prop({ required: true })
  dataNascimento: Date;

  @Prop()
  genero: string;

  @Prop()
  observacoes: string;

  @Prop({ default: true })
  ativo: boolean;
}

export const PacienteSchema = SchemaFactory.createForClass(Paciente);
