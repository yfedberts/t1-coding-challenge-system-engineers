import Kafka from 'node-rdkafka';
import Config from '../config';

export class KafkaConsumer {
  private consumer: Kafka.KafkaConsumer;

  constructor(
    private topic: string,
    private groupId: string,
    private messageHandler: (message: Kafka.Message) => void
  ) {
    this.consumer = new Kafka.KafkaConsumer(
      {
        'group.id': this.groupId,
        'metadata.broker.list': Config.kafka.brokers,
      },
      {}
    );

    this.consumer.on('ready', () => {
      console.log(`Subscribing to topic ${this.topic}`);
      this.consumer.subscribe([this.topic]);
      this.consumer.consume();
    });

    this.consumer.on('data', this.messageHandler);

    this.consumer.on('event.error', (err) => {
      console.error('Error from consumer:', err);
    });
  }

  protected ensureStarted() {
    if (!this.consumer.isConnected()) {
      throw new Error('Consumer is not started');
    }
  }

  isStarted() {
    return this.consumer.isConnected();
  }

  start() {
    this.consumer.connect();
    console.log('Kafka consumer is ready');
  }

  stop() {
    this.consumer.disconnect();
  }
}
