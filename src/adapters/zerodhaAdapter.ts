import { BrokerAdapter } from "./brokerAdapter";
import { Trade } from "../models/trade";

export class ZerodhaAdapter implements BrokerAdapter {
  async fetchTrades(token: string): Promise<any[]> {
    if (!token || token === "expired") {
      throw new Error("Invalid or expired token");
    }

    // Simulated response from Zerodha
    return [
      { trade_id: "T1", instrument: "INFY", qty: 10, price: 1500, type: "BUY", time: "2025-08-27T10:30:00Z" },
      { trade_id: "T2", instrument: "TCS", qty: 5, price: 3500, type: "SELL", time: "2025-08-27T12:00:00Z" }
    ];
  }

  normalize(rawTrades: any[]): Trade[] {
    return rawTrades.map((t) => ({
      id: t.trade_id,
      symbol: t.instrument,
      quantity: t.qty,
      price: t.price,
      side: t.type,
      timestamp: new Date(t.time),
      broker: "Zerodha"
    }));
  }
}
