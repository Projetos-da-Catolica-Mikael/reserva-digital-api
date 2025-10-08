import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ClinicaModule } from './clinica/clinica.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI ?? 'mongodb://localhost/clinica-digital'),
    ClinicaModule,
  ],
})
export class AppModule { }
