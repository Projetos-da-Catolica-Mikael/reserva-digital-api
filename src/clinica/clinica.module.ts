import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClinicaController } from './clinica.controller';
import { ClinicaService } from './clinica.service';
import { Clinica, ClinicaSchema } from './schemas/clinica.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Clinica.name, schema: ClinicaSchema }]),
  ],
  controllers: [ClinicaController],
  providers: [ClinicaService],
})
export class ClinicaModule { }
