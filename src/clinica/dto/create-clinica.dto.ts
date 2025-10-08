import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClinicaDto {
  @ApiProperty({ example: 'Clínica Vida Saudável', description: 'Nome da clínica' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: '12.345.678/0001-99', description: 'CNPJ da clínica' })
  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @ApiProperty({ example: '(11) 98765-4321', required: false })
  @IsOptional()
  @IsString()
  telefone?: string;

  @ApiProperty({ example: 'contato@vidasaudavel.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'Rua das Flores, 123 - São Paulo/SP', required: false })
  @IsOptional()
  @IsString()
  endereco?: string;

  @ApiProperty({ example: ['Cardiologia', 'Dermatologia'], required: false })
  @IsOptional()
  @IsArray()
  especialidades?: string[];
}
