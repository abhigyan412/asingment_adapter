import { TokenService } from "./services/tokenService";
import { SyncService } from "./services/syncService";

async function main() {
  const tokenService = new TokenService();
  const syncService = new SyncService(tokenService);

  const userId = "user1";
  const broker = "Zerodha";

  // Step 1: Give user a short-lived token
  tokenService.setToken(userId, broker, "valid_token", 5); // expires in 5s
  console.log(" Initial token set: valid_token (expires in 5s)");

  // Step 2: Sync trades immediately (should use the original token)
  const trades = await syncService.syncTrades(userId, broker);
  console.log(" Synced Trades with initial token:", trades);

  // Step 3: Wait until token expires (6s) then try again
  setTimeout(async () => {
    console.log("\n Token should be expired now...");
    const trades2 = await syncService.syncTrades(userId, broker);
    console.log(" Synced Trades after token refresh:", trades2);
  }, 6000);
}

main();
