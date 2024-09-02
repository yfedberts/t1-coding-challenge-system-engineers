import { TradeDTO } from './trade-dto';

export const processTrades = (trades: TradeDTO[]): { totalBuyVolume: number; totalSellVolume: number } => {
    let totalBuyVolume = 0;
    let totalSellVolume = 0;

    trades.forEach((trade) => {
        const volume = parseFloat(trade.volume);

        if (trade.tradeType === 'BUY') {
            totalBuyVolume += volume;
        } else if (trade.tradeType === 'SELL') {
            totalSellVolume += volume;
        }
    });

    return {
        totalBuyVolume,
        totalSellVolume,
    };
};
