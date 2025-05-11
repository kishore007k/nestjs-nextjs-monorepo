import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
class UserType {
  @Field(() => ID)
  id?: string;

  @Field()
  name?: string;

  @Field()
  email?: string;

  @Field()
  password?: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}

export const UserGraphqlType = UserType;
