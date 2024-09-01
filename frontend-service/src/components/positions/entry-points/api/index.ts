import { Router, Request, Response } from 'express';
import { addClient, removeClient, notifyClients, getOpenPosition } from '../../domain/position-services';
import { ServerResponseDTO } from '../../domain/server-response-dto';
import { OpenPositionDTO } from '../../domain/open-position-dto';

const ROUTER: Router = Router();

ROUTER.get('/', (req: Request, res: Response) => {
    try {
        const headers = {
            'Content-Type': 'text/event-stream',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache'
        };

        res.writeHead(200, headers);

        const client = addClient(res);

        // Send initial open position to client
        const openPosition: number = getOpenPosition();
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

        // TODO: Implement a better way to manage http status code later / errors later
        res.status(500).json(errorResponse);
    }
});

export default ROUTER;
