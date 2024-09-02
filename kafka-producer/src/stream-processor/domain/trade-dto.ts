import { BaseStreamMessageDTO } from "./base-stream-message-dto";

export interface TradeDTO extends BaseStreamMessageDTO {
    messageType: 'trades';
    tradeType: 'BUY' | 'SELL';
    volume: string;
    time: string;
}
