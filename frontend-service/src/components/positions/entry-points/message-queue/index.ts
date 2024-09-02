import { TradeConsumer } from "../../../../libraries/kafka/trade-consumer";

export const TradeConsumerInstance = new TradeConsumer('trades', 'trade-group');
export default TradeConsumerInstance;