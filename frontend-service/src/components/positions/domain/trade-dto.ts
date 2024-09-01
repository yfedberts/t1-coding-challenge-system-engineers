
export interface TradeDTO {
    messageType: 'trades';
    tradeType: 'BUY' | 'SELL';
    volume: string;
    time: string;
}
  