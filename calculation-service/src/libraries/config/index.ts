import { loadEnv } from './env-loader';

const config = {
  env: loadEnv('NODE_ENV', 'development') as string,
  port: loadEnv('PORT', 3001) as number,

  kafka: {
    brokers: loadEnv('KAFKA_BROKER', 'kafka:9092') as string,
    groupId: loadEnv('KAFKA_GROUP_ID', 'default-group') as string,
    clientId: loadEnv('KAFKA_CLIENT_ID', 'frontend-service-client') as string,
    topic: {
      trades: loadEnv('KAFKA_TRADES_TOPIC', 'trades') as string,
      profitLoss: loadEnv('KAFKA_PROFIT_LOSS_TOPIC', 'profit-loss') as string,
    },
  },

  database: {
    uri: loadEnv('DB_URI', 'mongodb://localhost:27017/frontend-service') as string,
  },
};

export default config;
