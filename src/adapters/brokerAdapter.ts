import { Trade } from "../models/trade";

export interface BrokerAdapter {
  fetchTrades(token: string): Promise<any[]>;   // raw broker trades
  normalize(rawTrades: any[]): Trade[];         // convert to unified Trade[]
}
