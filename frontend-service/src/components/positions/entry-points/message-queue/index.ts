import { KafkaConsumer } from '../../../../libraries/kafka/consumer';
import { TradeDTO } from '../../domain/trade-dto';
import { Message } from 'node-rdkafka';

const consumer : KafkaConsumer = new KafkaConsumer('trades', 'trade-group', (message : Message) => {
    console.log('received', message);
});

export default consumer;
