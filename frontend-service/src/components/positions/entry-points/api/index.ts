import { Router, Request, Response } from 'express';
import { addClient, removeClient, notifyClients } from '../../domain/server-events-manager';
import { ServerResponseDTO } from '../../domain/server-response-dto';
import { OpenPositionDTO } from '../../domain/open-position-dto';
import { TradeConsumerInstance } from '../message-queue';

const ROUTER: Router = Router();

ROUTER.get('/', (req: Request, res: Response) => {
    try {
        // Establish SSE connection
        const headers = {
            'Content-Type': 'text/event-stream',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache'
        };

        res.writeHead(200, headers);

        const client = addClient(res);

        const openPosition: number = TradeConsumerInstance.getOpenPosition();
        const response: ServerResponseDTO<OpenPositionDTO> = {
            success: true,
            data: { openPosition },
        };
        client.sendEvent(response);

        req.on('close', () => {
            removeClient(client);
        });
    } catch (error: unknown) {
        let errorMessage: string;

        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'string') {
            errorMessage = error;
        } else {
            errorMessage = 'An unknown error occurred';
        }

        const errorResponse: ServerResponseDTO<OpenPositionDTO> = {
            success: false,
            message: errorMessage,
        };

        res.status(500).json(errorResponse);
    }
});

export default ROUTER;
