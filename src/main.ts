import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';
import { AppModule } from './app.module';

const logger = new Logger('Main');
config();
async function bootstrap() {
  const port = process.env.PORT || 4004;
  const app = await NestFactory.create(AppModule);
  // await app.listen(3000);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      url: process.env.REDIS_URL,
    },
  });
  await app.startAllMicroservices();
  await app.listen(port);
  logger.log('Friendship Microservice running');
}
bootstrap();
