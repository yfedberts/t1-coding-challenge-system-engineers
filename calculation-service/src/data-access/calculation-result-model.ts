import { Schema, model, Document } from 'mongoose';

interface ICalculationResult extends Document {
  startTime: Date;
  endTime: Date;
  totalBuyVolume: number;
  totalSellVolume: number;
  result: number;
}

const CalculationResultSchema : Schema<ICalculationResult> = new Schema<ICalculationResult>({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  totalBuyVolume: { type: Number, required: true, default: 0 },
  totalSellVolume: { type: Number, required: true, default: 0 },
  result: { type: Number, required: true },
});

export const CalculationResultModel = model<ICalculationResult>('CalculationResult', CalculationResultSchema);
