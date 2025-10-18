import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PacienteController } from './paciente.controller';
import { PacienteService } from './paciente.service';
import { Paciente, PacienteSchema } from './schemas/paciente.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Paciente.name, schema: PacienteSchema }]),
  ],
  controllers: [PacienteController],
  providers: [PacienteService],
})
export class PacienteModule { }
