import { Producer, ProducerStream } from 'node-rdkafka';
import { config } from '../config';

export class KafkaProducer {
  private producer: Producer;

  constructor() {
    this.producer = new Producer({
      'metadata.broker.list': config.kafkaBroker as string,
      'dr_cb': true,
    });

    this.producer.on('ready', () => {
      console.log('Kafka Producer is ready');
    });

    this.producer.on('event.error', (err) => {
      console.error('Error from producer', err);
    });

    try {
        this.producer.connect();
    } catch (err) {
      console.error('Failed to connect to producer', err);
    }
  }

  produceMessage(topic: string, message: string) {
    try {
        if (this.producer.isConnected()) {
            this.producer.produce(
                topic,
                null,
                Buffer.from(message),
                null,
                Date.now()
              );
        }
    } catch (err) {
      console.error('Failed to produce message', err);
    }
  }
}
