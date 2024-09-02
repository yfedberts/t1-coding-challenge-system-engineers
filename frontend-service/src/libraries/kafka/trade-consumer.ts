import { KafkaConsumer } from "./consumer";
import { OpenPositionDTO } from "../../components/positions/domain/open-position-dto";
import { notifyClients } from "../../components/positions/domain/server-events-manager";
import { ServerResponseDTO } from "../../components/positions/domain/server-response-dto";
import { TradeDTO } from "../../components/positions/domain/trade-dto";
import { Message } from "node-rdkafka";

export class TradeConsumer extends KafkaConsumer {
    private totalBuyVolume: number;
    private totalSellVolume: number
    private openPosition: number;

    constructor(
        topic: string,
        groupId: string,
    ) {
        super(topic, groupId, (message) => this.processMessages(message));

        this.totalBuyVolume = 0;
        this.totalSellVolume = 0;
        this.openPosition = 0;
    }

    processMessages(message : Message) {
        try {
            this.ensureStarted();

            if (!message.value) {
                throw new Error('Received an empty message');
            }
    
            const trade: TradeDTO = JSON.parse(message.value.toString());
            this.processTrades(trade);
        } catch (error) {
            console.warn('Failed to process trade message:', error);
        }
    }

    processTrades(trade : TradeDTO) {
        this.ensureStarted();

        const volume = parseFloat(trade.volume);

        if (trade.tradeType === 'BUY') {
            this.totalBuyVolume += volume;
        } else if (trade.tradeType === 'SELL') {
            this.totalSellVolume += volume;
        }

        this.openPosition = this.totalBuyVolume - this.totalSellVolume;

        const output : ServerResponseDTO<OpenPositionDTO> = {
            success: true,
            data: {
                openPosition: this.openPosition
            }
        };

        notifyClients(output);
    }
    
    public getOpenPosition() {
        this.ensureStarted();
        return this.openPosition;
    }
}