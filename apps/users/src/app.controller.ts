import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { KafkaTopics } from '@kafka';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern(KafkaTopics.USERS.CREATE)
  getHello(@Payload() data: any): any {
    return data;
  }
}
