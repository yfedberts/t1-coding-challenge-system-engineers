import { loadEnv } from './env-loader';

export const config = {
  kafkaBroker: loadEnv('KAFKA_BROKER', 'kafka:9092'),
  streamEndpoint: loadEnv('STREAM_ENDPOINT', 'https://t1-coding-challenge-9snjm.ondigitalocean.app/stream'),
  topics: {
    market: loadEnv('MARKET_TOPIC', 'market'),
    trades: loadEnv('TRADES_TOPIC', 'trades'),
  },
};

export default config;
