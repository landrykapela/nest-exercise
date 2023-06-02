import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
// dotenv.config();
async function main() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 5555;
  console.log('🚀 ~ file: main.ts:9 ~ bootstrap ~ port:', port);

  await app.listen(port);
}
main();
