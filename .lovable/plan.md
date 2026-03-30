

# Uniform Production & Worker Management Dashboard

## Overview
A fully responsive, modern admin dashboard for managing uniform manufacturing operations. Built with React + Tailwind CSS using demo data only — no backend, no database, no authentication required.

## Design Theme
- **Colors**: Clean black–white–gray palette with **blue** as the accent color
- **Style**: Card-based layouts, minimal and modern with shadcn-style components
- **Animations**: Subtle fade transitions and hover effects for a polished feel
- **Layout**: Collapsible left sidebar + top header bar

---

## Page Structure

### 1. Dashboard (Home)
**6 Statistic Cards in a responsive grid:**
- Total Orders: 5
- Total Workers: 20
- Pieces Assigned: 2,400
- Pieces Completed: 1,820
- Estimated Monthly Payout: ₹2,18,400
- Completion Rate: 76%

**Below the cards:**
- Bar chart showing "Worker Productivity (Demo)"
- Table showing "Recent Orders" with Order Name, Date, Total Pieces, and Status
- **Search bar + status filter** for the orders table

---

### 2. Workers Page
**Search & Filter bar** at the top to filter by worker name

**Worker management table with:**
- Worker ID, Name, Phone, Bank/UPI columns
- Action buttons: Add Worker, Edit, Delete (modal-based UI)

**Demo data:** 3 sample workers expandable to show all 20

---

### 3. Uniform Items Page
**Item catalog table:**
- Item Name, Dimensions, Rate per piece
- Add Item button with modal form

**Demo items:** Shirt (₹120), Pant (₹140), Blazer (₹260)

---

### 4. New Order Page (Core Feature)
**Order creation form:**
- Order Name input field
- Quantity fields for Shirts (800), Pants (600), Blazers (200)

**📊 Order Summary Card (live updating):**
- Total Pieces: 1,600
- Estimated Payout: ₹1,92,000
- Breakdown by item type

**"Auto-Split Work" button**

**After clicking:**
- Displays allocation table showing each worker's assigned pieces
- Shows confirmation banner: "Work successfully distributed among 20 workers"

---

### 5. Production Tracking Page
**Search bar** to filter by worker name

**Enhanced progress table with visual status:**
- Worker name, Assigned pieces, Completed, Pending
- +/− buttons to adjust completed count
- Pending auto-calculates (Assigned − Completed)
- **Status indicators:**
  - 🟡 In Progress (when Pending > 0)
  - 🟢 Completed (when Pending = 0)

---

### 6. Monthly Payments & Reports Page
**Month selector dropdown**

**Per-worker payment cards showing:**
- Breakdown by item type (pieces × rate)
- Total earnings

**Summary section:**
- Total monthly payout
- Top performer badge
- Least performer badge
- Download buttons (PDF & Excel) — UI only

---

## Technical Approach
- **Mock Data**: Single `mockData.ts` file with all demo workers, items, orders
- **State Management**: React useState for local interactions
- **Routing**: React Router for page navigation
- **Charts**: Recharts library for bar chart
- **Components**: Reusable cards, tables, modals using shadcn/ui components
- **Responsive**: Mobile-first with sidebar collapsing on small screens

---

## Deliverables
✓ Sidebar navigation with 6 menu items  
✓ 6 fully functional pages with enhanced UX  
✓ Search & filter on Workers, Orders, and Production pages  
✓ Live Order Summary card on New Order page  
✓ Visual status indicators (🟡/🟢) in Production Tracking  
✓ Demo data file with realistic Indian context  
✓ Mobile, tablet, and desktop responsive design

