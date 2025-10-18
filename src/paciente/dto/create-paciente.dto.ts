import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreatePacienteDto {
  @ApiProperty({ example: 'João Silva Santos', description: 'Nome completo do paciente' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    example: '12345678901',
    description: 'CPF sem máscara (apenas números)',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+$/, { message: 'O CPF deve conter apenas números.' })
  @Length(11, 11, { message: 'O CPF deve ter exatamente 11 dígitos.' })
  cpf: string;

  @ApiProperty({ example: '(11) 98765-4321', required: false })
  @IsOptional()
  @IsString()
  telefone?: string;

  @ApiProperty({ example: 'joao.silva@email.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'Rua das Flores, 123 - São Paulo/SP', required: false })
  @IsOptional()
  @IsString()
  endereco?: string;

  @ApiProperty({
    example: '1990-05-15',
    description: 'Data de nascimento no formato YYYY-MM-DD',
    required: true
  })
  @IsDateString()
  @IsNotEmpty()
  dataNascimento: string;

  @ApiProperty({
    example: 'Masculino',
    description: 'Gênero do paciente',
    required: false
  })
  @IsOptional()
  @IsString()
  genero?: string;

  @ApiProperty({
    example: 'Paciente com alergia a penicilina',
    description: 'Observações médicas',
    required: false
  })
  @IsOptional()
  @IsString()
  observacoes?: string;
}
