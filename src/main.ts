import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { mw } from 'request-ip';
// dotenv.config();
async function main() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 5555;
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.setGlobalPrefix('api/v1');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(mw());

  console.log('🚀 ~ file: main.ts:9 ~ bootstrap ~ port:', port);

  const config = new DocumentBuilder()
    .setTitle('My NestJS API Exercise Doc')
    .setDescription('API Specification Document')
    .setVersion('1.0')
    .addTag('NestJS')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/v1/doc', app, document);
  await app.listen(port);
}
main();
