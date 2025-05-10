import { KafkaTopics, KafkaTopicKeys } from "./topics";

export type KafkaPayloads = {
  [KafkaTopics.USERS.GET_ONE]: { userId: string };
  [KafkaTopics.USERS.GET_ALL]: { page: number; limit: number };
  [KafkaTopics.USERS.CREATE]: { email: string; name: string };
  [KafkaTopics.USERS.UPDATE]: { userId: string; name: string };
  [KafkaTopics.USERS.DELETE]: { userId: string };
};

export type KafkaMessage<T extends KafkaTopicKeys> = {
  topic: T;
  value: KafkaPayloads[T];
};

export type KafkaHandler<T extends KafkaTopicKeys> = (
  payload: KafkaPayloads[T]
) => Promise<void>;

export type KafkaProducer<T extends KafkaTopicKeys> = (
  payload: KafkaPayloads[T]
) => void;
