import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ModelTypes, PayloadTypes } from '@repo/types';
import { KafkaTopics } from '@repo/kafka';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @EventPattern(KafkaTopics.USERS.CREATE)
  getHello(@Payload() data: PayloadTypes.UserDataPayload): ModelTypes.UserType {
    this.logger.log('Received event: users.create');
    this.logger.log('Data: ', data);
    return data;
  }
}
