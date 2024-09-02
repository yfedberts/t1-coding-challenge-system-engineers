import { KafkaConsumer } from '../../libraries/kafka/consumer';
import { MarketDTO } from '~/domain/market-dto';

const marketConsumer = new KafkaConsumer('market', 'market-group', async (message) => {
  try {
    if (!message.value) {
        throw new Error('Received an empty message');
    }

    const market: MarketDTO = JSON.parse(message.value.toString());
  } catch (error) {
    console.error('Failed to process market message:', error);
  }
});

marketConsumer.start();
