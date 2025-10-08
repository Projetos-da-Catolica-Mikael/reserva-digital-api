import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClinicaModule } from './clinica/clinica.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI ?? 'mongodb://localhost/clinica-digital'),
    ClinicaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
