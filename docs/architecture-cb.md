# Architectural Layout Document
_Author: Christian Bugtai_
_Last updated: 2025-10-24_

This document explains the "Sellers" feature architechture: repositories, services and hooks.
1) It describes what each implementation does
2) Why the logic is placed where it is
3) Where each is used in the application

## Repositories:

### `sellerRepo.ts`

**What it does**

- Acts as the data-access Layer for the sellers component.
- Provides CRUD functions agains a mock "sellerData" array.
- Exposes:
    - `fetchAllSellers()`
    - `getSellerById(id)`
    - `addFavoriteSeller(id)` / `removeFavoriteSeller(id)`
    - `addBlockedSeller(id)` / `removeBlockedSeller(id)`
 
 **How logic is separated**

 - This repository only accesses and modifies data, it does not contain business rules
 - This allows this layer to be reusable and isolated from any ui of business logic.

 **Where it’s used**

- Called exclusively by `sellerService.ts`.  
- Never accessed directly by React components or hooks.

---

## Services:

### `sellerService.ts`

**What it does**

- Defines business rules and workflows related to sellers.  
- Exposes:
  - `getAllSellers()`
  - `toggleFavoriteSeller(id)`
  - `toggleBlockedSeller(id)` — enforces the rule that “a seller cannot be a favorite while blocked.”

**How logic is sperated**

- Services decide when and why to modify data
- ex. `toggleBlockedSellers` removes a seller from favories before blovking. this is business logic, not a data operation.

**Where it's used**

- used by the `useSellers` hook to perform seller actions while managing state
- keeps react components free from complex conditional logic

---

## Hooks

### `useSellers`

**What it does**

- a custom hook that manages seller-realted state in the ui.
- fetches sellers, handles filtering and exposes actions to toggele favorite or blocked status.
- uses `sellerService` for all data operations

**How logic is separated**

- the hook deals with react concers: state, side-effects and ui updates
- delagates the business logic to the service layer.

**Where it's used**

- `SellersListDisplay` uses this hook to:
    - Retrieve sellers list
    - apply filtering (eg. only show favorites or blocked)
    - call toggle functions from services with user interaction