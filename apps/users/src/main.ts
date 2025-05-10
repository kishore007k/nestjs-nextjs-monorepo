import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { KafkaGroupId } from '@kafka';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: KafkaGroupId.USER,
        },
      },
    },
  );

  await app.listen().then(() => {
    logger.log('Users service is listening...');
  });
}
bootstrap();
