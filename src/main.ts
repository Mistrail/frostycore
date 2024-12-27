import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from "dotenv"

async function bootstrap() {
  dotenv.config()
  
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder()
    .setExternalDoc('Schema.JSON', 'schema.json')
    .build()
  const docFactory = () => SwaggerModule.createDocument(app, config, {
    autoTagControllers: true,
    deepScanRoutes: true,
  })

  SwaggerModule.setup('api', app, docFactory, {
    jsonDocumentUrl: "schema.json",
    yamlDocumentUrl: "schema.yaml",
    swaggerUiEnabled: true,
  })

  await app.listen(Number(process.env.PORT))
}
bootstrap();
