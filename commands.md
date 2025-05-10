```
// packages/kafka/topics.ts
export const KafkaTopics = {
	USERS: {
		GET_ONE: "users.get",
		GET_ALL: "users.getAll",
		CREATE: "users.create",
		UPDATE: "users.update",
		DELETE: "users.delete",
	},
} as const;

type ValueOf<T> = T[keyof T];
export type KafkaTopicKeys = ValueOf<typeof KafkaTopics.USERS>;



// packages/kafka/types.ts
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



// packages/kafka/services.ts
export const KafkaServices = {
	USER: "USER_SERVICE",
} as const;

export const KafkaGroupId = {
	USER: "users-consumer",
};

export type KafkaService = (typeof KafkaServices)[keyof typeof KafkaServices];
export type KafkaServicesType = {
	[K in keyof typeof KafkaServices]: {
		name: K;
	} & (typeof KafkaServices)[K];
};



// packages/kafka/index.ts
export * from "./topics";
export * from "./types";
export * from "./services";
```