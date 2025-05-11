import { Module } from '@nestjs/common';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaServices, KafkaGroupId } from '@repo/kafka';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: KafkaServices.USER,
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
    ]),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), './schema.gql'),
      sortSchema: true,
    }),
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
