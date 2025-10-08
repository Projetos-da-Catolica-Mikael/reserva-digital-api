import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as swaggerUi from 'swagger-ui-express';
import { version } from '../package.json';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Clínica Digital API')
    .setDescription('Documentação da API de gerenciamento de clínicas digitais')
    .setVersion(version)
    .addTag('clinicas')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(document, {
    customSiteTitle: 'Clínica Digital API Docs',
    swaggerOptions: {
      persistAuthorization: true,
    },
  }));

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Aplicação rodando em: http://localhost:${port}`);
  console.log(`📘 Swagger disponível em: http://localhost:${port}`);
}

bootstrap();
