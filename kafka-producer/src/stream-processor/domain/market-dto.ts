import { BaseStreamMessageDTO } from "./base-stream-message-dto";

export interface MarketDTO extends BaseStreamMessageDTO {
    messageType: 'market';
    buyPrice: string;
    sellPrice: string;
    startTime: string;
    endTime: string;
}