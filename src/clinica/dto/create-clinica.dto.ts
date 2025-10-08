import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClinicaDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  endereco?: string;

  @IsOptional()
  @IsArray()
  especialidades?: string[];
}
