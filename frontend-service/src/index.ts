import { Application } from 'express';
import createApp from './app';

const PORT: number = parseInt(process.env.PORT || '3001', 10);
const server : Application = createApp();

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});