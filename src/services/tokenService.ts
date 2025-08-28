type TokenRecord = {
  token: string;
  expiry: Date;
};

export class TokenService {
  private tokens: Map<string, TokenRecord>; // key = userId:broker

  constructor() {
    this.tokens = new Map();
  }

  private getKey(userId: string, broker: string): string {
    return `${userId}:${broker}`;
  }

  setToken(userId: string, broker: string, token: string, ttlSeconds: number): void {
    const expiry = new Date(Date.now() + ttlSeconds * 1000);
    this.tokens.set(this.getKey(userId, broker), { token, expiry });
  }

 getToken(userId: string, broker: string): string | null {
  const record = this.tokens.get(this.getKey(userId, broker));
  if (!record) {
    console.log("❌ No token found for", userId, broker);
    return null;
  }

  if (record.expiry < new Date()) {
    console.log("⏳ Token expired at", record.expiry.toISOString());
    return null; // expired
  }

  console.log("✅ Token is still valid until", record.expiry.toISOString());
  return record.token;
}

  refreshToken(userId: string, broker: string): string {
  const newToken = `token_${Date.now()}`;
 this.setToken(userId, broker, newToken, 60);
  console.log("🔄 Refreshed token:", newToken);
  return newToken; 

 }
}
