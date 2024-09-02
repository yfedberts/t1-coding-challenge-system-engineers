import { KafkaConsumer } from '../../libraries/kafka/consumer';
import { processTrades } from '../../domain/calculate-service';
import { TradeDTO } from '../../domain/trade-dto';
import { Message } from 'node-rdkafka';

const tradeConsumer = new KafkaConsumer('trades', 'trade-group', async (message : Message) => {
    try {
        if (!message.value) {
            throw new Error('Received an empty message');
        }

    } catch (error) {
        console.error('Failed to process trade message:', error);
    }
});
  
tradeConsumer.start();