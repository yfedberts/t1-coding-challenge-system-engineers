import dotenv from 'dotenv';
import express, { Application, Request, Response, NextFunction } from 'express';
import positionsRouter from './components/positions/entry-points/api';
import TradesKafkaConsumer from './components/positions/entry-points/message-queue';

// Load environment variables from .env file
dotenv.config();

const createApp = (): Application => {
    const app: Application = express();

    app.use(express.json());

    app.get('/', (req: Request, res: Response) => {
        res.send('Hello Worsld!');
    });

    // routes here
    app.use('/api/positions', positionsRouter);

    // Error Handling
    app.use((req: Request, res: Response, next: NextFunction) => {
        const error = new Error('Endpoint Not Found');
        res.status(404);
        next(error);
    });

    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        res.status(res.statusCode || 500);
        res.json({
            message: error.message || 'Internal Server Error',
            ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
        });
    });

    return app;
};

export default createApp;
