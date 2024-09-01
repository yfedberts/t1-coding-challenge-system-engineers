import { Response } from "express";

export class ServerEventsClient {
    public id: string;

    constructor(private response : Response) {
        this.id = Math.random().toString(36).substring(7);
    }

    sendEvent(data: any) {
        this.response.write(`data: ${JSON.stringify(data)}\n\n`);
    }

    close() {
        console.log(`Closing connection for client ${this.id}`);
        this.response.end();
    }
}