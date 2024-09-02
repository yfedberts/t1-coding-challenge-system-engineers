import { KafkaProducer } from '../../kafka/producer';
import { config } from '../../config';
import { BaseStreamMessageDTO } from './base-stream-message-dto';

const KAFKA_PRODUCER : KafkaProducer = new KafkaProducer();

export const processStreamMessage = (streamMessage: string): void => {
  try {
    const data: BaseStreamMessageDTO = JSON.parse(streamMessage);

    if (!Object.keys(config.topics).includes(data.messageType)) {
      throw new Error(`Invalid message type: ${data.messageType}`);
    }

    KAFKA_PRODUCER.produceMessage(data.messageType, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to process message:', error instanceof Error ? error.message : error);
  }
};
