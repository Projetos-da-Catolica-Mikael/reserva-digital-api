import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsuarioDocument = Usuario & Document;

export enum UsuarioRole {
  USUARIO = 'usuario',
  ADMIN = 'admin',
}

@Schema({ timestamps: true, collection: 'usuarios' })
export class Usuario {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: Object.values(UsuarioRole), default: UsuarioRole.USUARIO })
  role: UsuarioRole;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
