# RRC Marketplace

## Project Team

**Team Name:** Team 4

**Team Members:**
- Christian Bugtai
- Nick Gowler
- Pinyi Rao

## Project General Description

RRC Marketplace is a web platform designed to connect buyers and sellers of
used college materials within a school community. The goal is to make it easier
for students to access affordable resources and for graduates to recoup some of
their expenses. By fostering a circular economy on campus, the platform promotes
sustainability, affordability, and convenience.

### User Stories

- As a new college student, I want to get a good deal on what I need for class,
so I can save money and start strong.

- As a graduate, I want to sell my used class materials that I no longer need,
so I can declutter and earn back some costs.

- As an instructor, I want somewhere I can send my students for cheaper class
materials, so they're better prepared without financial.

## Local Setup
These are the steps to run the app on your local machine.

### Step 1. Check Prerequisites
- **Node.js (v16+)** installed and added to PATH
- **Docker Desktop** installed and running
- Required Ports are free: **5432**, **3000**, **5173**
- **Clerk AUTH** application is created
    - Must create a JWT template named default

### Step 2. Create Environment Variables
Create the following `.env` files before running the app.

**Backend** - `apps/backend/.env`
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/FullStackApp?schema=public"
PORT=3000
FRONTEND_URL=http://localhost:5173
CLERK_PUBLISHABLE_KEY=<YOUR CLERK PUBLISHABLE KEY>
CLERK_SECRET_KEY=<YOUR CLERK SECRET KEY>
```
**Frontend** - `apps/frontend/.env`
```env
VITE_API_BASE_URL="http://localhost:3000"
VITE_CLERK_PUBLISHABLE_KEY=<YOUR CLERK PUBLISHABLE KEY>
```

### Step 3. Initialize Project
Ensure that all environment variables are set, then from the **project root**, run:
```bash
npm run deploy
```
This will:
- Install all dependencies
- Start the PostgeSQL container
- Apply backend migrations
- Seed the database

### Step 4. Start the App
```bash
npm run dev
```

## Sprint Contributions

### Sprint 1

**Christian Bugtai**
- Set up Project Git Repository
- Top Sellers List Component
- Styling Top Sellers List
  
**Pinyi Rao**
- App Integration
- App Stylesheet
- List of Featured Products Component
- Styling List of Featured Products
- Project Initialization
  
**Nick Gowler**
- Project Readme
- Testimonials Component
- Styling Testimonials

### Sprint 2 and 3

**Christian Bugtai**
-  App Outlet Navigation
-  Feature Page (All Sellers)
   - Form Component (Search Bar)
   - Element Addition/Removal (Favorites and Blocked Pages)
- Repository Definition and Integration (sellerRepo)
  - Test Data (MockSellerData)
  - New/Refactored Components (SellerListDisplay)
- Architectural Layout Document (sellerRepo, sellerService, useSellers)

**Pinyi Rao**
- Hook Definitions
- Featured Page (Wishlist)
  - Form Component (Product Review)
  - Element Addition/Removal (Add/Remove Product Wishlist)
- Repository Definition and Integration (productRepo)
  - Test Data (MockProductData)
  - New/Refactored Components
- Architectural Layout Document (productRepo, productService, useProduct)

**Nick Gowler**
- Navigation Interface
- Service Definitions
- Featured Page (Dashboard)
  - Form Component (Create Listing)
  - Element Addition/Removal (Edit Listing, Change Password, Change Username)
- Repository Definition and Integration (testimonialRepo, userRepo, listingRepo)
  - Test Data (testimonialData, userData)
  - New/Refactored Components
- Architectural Layout Document


### Sprint 4

**Christian Bugtai**
- T.2 Development SQL Database
- T.3 Prisma Installation and Client Initialization (discussed with database diagram)

- I.1: Back-end Resource Endpoint
  - blocking seller management
  - favourite seller management
- I.2: Resource Database Schema
  - Define models (Seller, UserSellerPreference)
  - Create seed function to initialize data
- I.3: Front-end Repository sends requests to back-end
- I.4 Application State Persistence

**Pinyi Rao**
- T.1: Back-end App Initialization
- T.3 Prisma Installation and Client Initialization  (discussed with database diagram)
- T.4 Back-end CORS Configuration

- I.1: Back-end Resource Endpoint
  - reviews management
  - product and wishlist management
- I.2: Resource Database Schema
  - Define models (Reviews, Wishlist)
  - Create seed function to initialize data
- I.3: Front-end Repository sends requests to back-end
- I.4 Application State Persistence

**Nick Gowler**
- T.3 Prisma Installation and Client Initialization (built database diagram)
- T.4 Back-end CORS Configuration

- I.2: Resource Database Schema
  - Define models (User, Listings, Category, Condition, Brand, Status, ListingViews, BrandCategory)
  - Create seed function to initialize data
