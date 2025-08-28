# Broker Sync Integration Layer (One-Way Sync)

## 🚀 Overview
This project implements a backend integration layer to fetch and normalize trades from brokers (e.g., Zerodha).  
It supports token management (expiry + refresh) and a clean, extensible architecture.

---


### Flow
1. User requests trade sync.
2. `SyncService` retrieves user token from `TokenService`.
3. If token expired → refreshes token.
4. Calls broker adapter (`fetchTrades`).
5. Adapter normalizes data into `Trade` objects.
6. Returns consistent trade list.

---

## 📊 Architecture Diagram

```mermaid
flowchart TD
    A["User Request (syncTrades)"] --> B["SyncService"]
    B --> C["TokenService"]
    C -->|Valid| D["BrokerAdapter (Zerodha)"]
    C -->|Expired| E["Refresh Token"]
    E --> D
    D --> F["Normalizer"]
    F --> G["Unified Trade[]"]


##  How to Run
npm install
npx ts-node src/index.ts
- Go to https://drive.google.com/file/d/1YbuSfbtBtLbJ0ScVfarnjljxw7prHOkY/view?usp=sharing    for diagramatic representation.  
