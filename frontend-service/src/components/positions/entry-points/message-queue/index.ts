import { KafkaConsumer } from '../../../../libraries/kafka/consumer';
import { TradeDTO } from '../../domain/trade-dto';
import Kafka from 'node-rdkafka';

const consumer = new KafkaConsumer('trades', 'trade-group', (message : Kafka.Message) => {
    throw new Error('Not implemented');
});

consumer.start();
