import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({ example: 'João da Silva', description: 'Nome completo do usuário' })
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: 'joao.silva@email.com', description: 'E-mail do usuário' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senhaSegura123', description: 'Senha com no mínimo 6 caracteres' })
  @MinLength(6)
  password: string;

  // Role não é aceito no registro; padrão é 'usuario'.
}
