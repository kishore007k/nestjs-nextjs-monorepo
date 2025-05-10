import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaTopics, KafkaServices } from '@kafka';

@Controller()
export class AppController {
  constructor(
    @Inject(KafkaServices.USER) private readonly kafkaUserService: ClientKafka,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello() {
    this.kafkaUserService.emit(KafkaTopics.USERS.CREATE, {
      id: 1,
      name: 'John Doe',
      email: 'kishorekumar07@gmail.com',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);
  }
}
