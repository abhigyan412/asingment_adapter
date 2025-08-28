export interface  Trade {
  id: string;
  symbol: string;
  quantity: number;
  price: number;
  side: "BUY" | "SELL";
  timestamp: Date;
  broker: string;
}
