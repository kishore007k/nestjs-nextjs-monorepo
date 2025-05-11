import { Inject, Logger, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';
import { Query, Resolver } from '@nestjs/graphql';
import { KafkaServices, KafkaTopics } from '@repo/kafka';
import { ModelTypes, GraphqlTypes } from '@repo/types';
import { lastValueFrom } from 'rxjs';

@Resolver()
export class AppResolver implements OnModuleInit {
  private readonly logger = new Logger(AppResolver.name);

  constructor(
    @Inject(KafkaServices.USER) private readonly kafkaUserService: ClientKafka,
    private readonly appService: AppService,
  ) {}

  onModuleInit() {
    this.kafkaUserService.subscribeToResponseOf(KafkaTopics.USERS.CREATE);
    this.kafkaUserService.subscribeToResponseOf(KafkaTopics.USERS.GET_ALL);
    this.kafkaUserService.subscribeToResponseOf(KafkaTopics.USERS.GET_ONE);
    this.kafkaUserService.subscribeToResponseOf(KafkaTopics.USERS.UPDATE);
    this.kafkaUserService.subscribeToResponseOf(KafkaTopics.USERS.DELETE);
    this.kafkaUserService.connect();
  }

  @Query(() => GraphqlTypes.UserGraphqlType, { name: 'hello' })
  async getHello() {
    const userData = {
      id: 1,
      name: 'John Doe',
      email: 'kishorekumar07@gmail.com',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as ModelTypes.UserType;

    const eventResponse = this.kafkaUserService.emit(
      KafkaTopics.USERS.CREATE,
      userData,
    );

    this.logger.log('Event sent to Kafka:', lastValueFrom(eventResponse));

    return lastValueFrom(eventResponse);
  }
}
