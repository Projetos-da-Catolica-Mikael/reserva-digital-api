import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateClinicaDto {
  @ApiProperty({ example: 'Clínica Vida Saudável', description: 'Nome da clínica' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    example: '12345678000199',
    description: 'CNPJ sem máscara (apenas números)',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+$/, { message: 'O CNPJ deve conter apenas números.' })
  @Length(14, 14, { message: 'O CNPJ deve ter exatamente 14 dígitos.' })
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
