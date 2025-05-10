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
