import { ZerodhaAdapter } from "../adapters/zerodhaAdapter";
import { TokenService } from "./tokenService";
import { Trade } from "../models/trade";

export class SyncService {
  constructor(private tokenService: TokenService) {}

  async syncTrades(userId: string, broker: string): Promise<Trade[]> {
    let adapter;
    if (broker === "Zerodha") {
      adapter = new ZerodhaAdapter();
    } else {
      throw new Error(`Broker ${broker} not supported`);
    }

    let token = this.tokenService.getToken(userId, broker);
    if (!token) {
      console.log("Token expired or missing. Refreshing...");
      token = this.tokenService.refreshToken(userId, broker);
    }

    const rawTrades = await adapter.fetchTrades(token);
    return adapter.normalize(rawTrades);
  }
}
