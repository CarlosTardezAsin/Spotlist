import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const cnfSv = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('AutoTagger API')
  .setVersion('1.0')
  .addBearerAuth()
  .addOAuth2()
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(String(cnfSv.get('BASE_PATH_DOCS')), app, document);



  await app.listen(3000);
}
bootstrap();
