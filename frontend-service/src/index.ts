import { Application } from 'express';
import createApp from './app';
import { TradeConsumerInstance } from './components/positions/entry-points/message-queue';

const PORT: number = parseInt(process.env.PORT || '3001', 10);
const server : Application = createApp();

server.listen(PORT, () => {
    TradeConsumerInstance.start();
    console.log(`Server is running on port ${PORT}`);
});