export const KafkaServices = {
  USER: "USER_SERVICE",
} as const;

export const KafkaGroupId = {
  USER: "users-consumer",
} as const;

export type KafkaService = (typeof KafkaServices)[keyof typeof KafkaServices];
export type KafkaServicesType = {
  [K in keyof typeof KafkaServices]: {
    name: K;
  } & (typeof KafkaServices)[K];
};
