# Graph Report - .  (2026-06-23)

## Corpus Check
- 243 files · ~79,520 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 749 nodes · 1307 edges · 71 communities (58 shown, 13 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_User Registration & Verification|User Registration & Verification]]
- [[_COMMUNITY_System & Branch Monitoring|System & Branch Monitoring]]
- [[_COMMUNITY_Root Layout & Typography|Root Layout & Typography]]
- [[_COMMUNITY_Cart API Routes|Cart API Routes]]
- [[_COMMUNITY_Landing Grid & Sidebar|Landing Grid & Sidebar]]
- [[_COMMUNITY_Product Catalog Toolbar & Actions|Product Catalog Toolbar & Actions]]
- [[_COMMUNITY_Email Verification Schema|Email Verification Schema]]
- [[_COMMUNITY_Inventory Flow & KPI Metrics|Inventory Flow & KPI Metrics]]
- [[_COMMUNITY_Cashier Shopping Cart|Cashier Shopping Cart]]
- [[_COMMUNITY_Customer Dashboard Navigation & Header|Customer Dashboard Navigation & Header]]
- [[_COMMUNITY_Cashier Transaction History|Cashier Transaction History]]
- [[_COMMUNITY_Customer Checkout & Cart Store|Customer Checkout & Cart Store]]
- [[_COMMUNITY_Staff Inventory & KPI Cards|Staff Inventory & KPI Cards]]
- [[_COMMUNITY_Staff Payment & Pickup Lists|Staff Payment & Pickup Lists]]
- [[_COMMUNITY_Dashboard Sidebars & Topbar|Dashboard Sidebars & Topbar]]
- [[_COMMUNITY_Staff Pickup Confirmation Modal|Staff Pickup Confirmation Modal]]
- [[_COMMUNITY_Staff Transaction Feed & Table|Staff Transaction Feed & Table]]
- [[_COMMUNITY_BentaHub System Architecture Docs|BentaHub System Architecture Docs]]
- [[_COMMUNITY_Staff Stock Management|Staff Stock Management]]
- [[_COMMUNITY_Admin User Management Modals|Admin User Management Modals]]
- [[_COMMUNITY_Admin History & Transaction Table|Admin History & Transaction Table]]
- [[_COMMUNITY_Customer Orders & History|Customer Orders & History]]
- [[_COMMUNITY_Customer Catalog Sidebar & Pagination|Customer Catalog Sidebar & Pagination]]
- [[_COMMUNITY_Customer Reservation Summary|Customer Reservation Summary]]
- [[_COMMUNITY_Branch Inventory Schema|Branch Inventory Schema]]
- [[_COMMUNITY_Orders Schema|Orders Schema]]
- [[_COMMUNITY_Admin Overview Analytics|Admin Overview Analytics]]
- [[_COMMUNITY_Admin Reservations & Users Panel|Admin Reservations & Users Panel]]
- [[_COMMUNITY_Admin Payment History Modals|Admin Payment History Modals]]
- [[_COMMUNITY_Admin Sales Analytics Actions|Admin Sales Analytics Actions]]
- [[_COMMUNITY_Cashier Layout & Navigation|Cashier Layout & Navigation]]
- [[_COMMUNITY_Admin Notifications Feed|Admin Notifications Feed]]
- [[_COMMUNITY_Cashier Payments Panel|Cashier Payments Panel]]
- [[_COMMUNITY_Cashier Product Stock View|Cashier Product Stock View]]
- [[_COMMUNITY_Customer Notifications Feed|Customer Notifications Feed]]
- [[_COMMUNITY_Transactions Schema|Transactions Schema]]
- [[_COMMUNITY_Admin Database Seeding|Admin Database Seeding]]
- [[_COMMUNITY_Authentication & Setup Documentation|Authentication & Setup Documentation]]
- [[_COMMUNITY_Notifications Hook & Zustand Store|Notifications Hook & Zustand Store]]
- [[_COMMUNITY_Admin Sidebar Layout|Admin Sidebar Layout]]
- [[_COMMUNITY_Staff Notifications Feed|Staff Notifications Feed]]
- [[_COMMUNITY_Products Schema|Products Schema]]
- [[_COMMUNITY_Cashier Notifications Feed|Cashier Notifications Feed]]
- [[_COMMUNITY_Admin Pickups & Metrics|Admin Pickups & Metrics]]
- [[_COMMUNITY_Admin Branch Stock Table|Admin Branch Stock Table]]
- [[_COMMUNITY_Docker Configuration & Setup|Docker Configuration & Setup]]
- [[_COMMUNITY_Notifications Types|Notifications Types]]
- [[_COMMUNITY_Authentication Layout|Authentication Layout]]
- [[_COMMUNITY_Database Connection Check Scripts|Database Connection Check Scripts]]
- [[_COMMUNITY_Database Table Creation Scripts|Database Table Creation Scripts]]
- [[_COMMUNITY_Product Database Seeding Scripts|Product Database Seeding Scripts]]
- [[_COMMUNITY_Database Setup Shell Scripts|Database Setup Shell Scripts]]
- [[_COMMUNITY_ESLint Rules Configuration|ESLint Rules Configuration]]
- [[_COMMUNITY_PostCSS Configuration|PostCSS Configuration]]
- [[_COMMUNITY_Customer System Status Documentation|Customer System Status Documentation]]
- [[_COMMUNITY_Email Verification Schema|Email Verification Schema]]

## God Nodes (most connected - your core abstractions)
1. `db` - 23 edges
2. `verifyToken()` - 22 edges
3. `extractToken()` - 22 edges
4. `generateId()` - 18 edges
5. `Product` - 16 edges
6. `useAuth()` - 13 edges
7. `users` - 13 edges
8. `useCart()` - 12 edges
9. `useOrders()` - 11 edges
10. `hashVerificationCode()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Graphify Knowledge Graph Rules` --conceptually_related_to--> `Feature-Sliced Design (FSD) Architecture`  [INFERRED]
  AGENTS.md → docs/BENTAHUB.md
- `seedProducts()` --calls--> `generateId()`  [EXTRACTED]
  scripts/seed-products.ts → src/lib/auth-utils.ts
- `Local Development Setup` --conceptually_related_to--> `Postgres Database Service (Docker)`  [INFERRED]
  README.md → docker-compose.yml
- `GET()` --calls--> `getMonitoringData()`  [INFERRED]
  src/app/api/admin/notifications/route.ts → src/features/admin-dashboard/actions/get-monitoring.ts
- `ReservationsPage()` --calls--> `useOrders()`  [INFERRED]
  src/app/customer/reservations/page.tsx → src/hooks/useOrders.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **BentaHub User Workflows** — docs_bentahub_admin_flow, docs_bentahub_cashier_flow, docs_bentahub_staff_flow, docs_bentahub_customer_flow [EXTRACTED 1.00]
- **BentaHub Core Modules** — docs_bentahub_centralized_monitoring, docs_bentahub_qr_pos, docs_bentahub_reservations, docs_bentahub_analytics [EXTRACTED 1.00]
- **BentaHub Database Schema Elements** — docs_backend_setup_users_table, docs_backend_setup_verification_table, docs_implementation_summary_users_table, docs_implementation_summary_email_verification_codes_table [INFERRED 0.85]

## Communities (71 total, 13 thin omitted)

### Community 0 - "User Registration & Verification"
Cohesion: 0.08
Nodes (45): registerSchema, registerUser(), resendCodeSchema, resendVerificationCodeAction(), verifyEmailAction(), verifyEmailSchema, POST(), getVerificationEmailHtml() (+37 more)

### Community 1 - "System & Branch Monitoring"
Cohesion: 0.06
Nodes (34): formatCurrency(), getMonitoringData(), RawBranch, RawInventory, RawProduct, RawTransaction, BranchStockItem, BranchStockOverview() (+26 more)

### Community 2 - "Root Layout & Typography"
Cohesion: 0.06
Nodes (18): fontMono, fontSans, fontSerif, metadata, AuthHeader(), AuthHeaderProps, AuthContext, AuthContextValue (+10 more)

### Community 3 - "Cart API Routes"
Cohesion: 0.11
Nodes (28): GET(), getUserIdFromToken(), DELETE(), getUserIdFromToken(), PUT(), extractToken(), verifyToken(), getUserIdFromToken() (+20 more)

### Community 4 - "Landing Grid & Sidebar"
Cohesion: 0.08
Nodes (18): branches, BranchGrid(), CtaBanner(), DashboardSidebar(), DashboardSidebarProps, Footer(), HeroSection(), Navbar() (+10 more)

### Community 5 - "Product Catalog Toolbar & Actions"
Cohesion: 0.13
Nodes (14): CatalogToolbar(), ProductActions(), ProductActionsProps, ProductBreadcrumb(), ProductBreadcrumbProps, ProductDetailsSection(), ProductDetailsSectionProps, ProductImageGallery() (+6 more)

### Community 6 - "Email Verification Schema"
Cohesion: 0.11
Nodes (16): EmailVerificationCode, emailVerificationRelations, InsertEmailVerificationCode, insertEmailVerificationSchema, selectEmailVerificationSchema, InsertNotification, insertNotificationSchema, Notification (+8 more)

### Community 7 - "Inventory Flow & KPI Metrics"
Cohesion: 0.16
Nodes (10): InventoryFlowTrend(), KPICard(), KPICardProps, PaymentMetrics(), ReservationFilters(), ReservationMetrics(), BranchOption, SalesFilters() (+2 more)

### Community 8 - "Cashier Shopping Cart"
Cohesion: 0.21
Nodes (11): CashierPage(), CartItem(), CartItemProps, CartSidebar(), CartSidebarProps, CATEGORIES, ProductCatalog(), ProductCatalogProps (+3 more)

### Community 9 - "Customer Dashboard Navigation & Header"
Cohesion: 0.19
Nodes (9): DashboardMobileNav(), DashboardMobileNavProps, DashboardTopbar(), getInitials(), NearbyBranches(), SummaryCards(), CustomerLayout(), CustomerPage() (+1 more)

### Community 10 - "Cashier Transaction History"
Cohesion: 0.14
Nodes (9): TransactionsTable(), transactions, ReceiptModalProps, PaymentStatus, PRODUCT_CATEGORIES, ProductCategory, StockStatus, TransactionItem (+1 more)

### Community 11 - "Customer Checkout & Cart Store"
Cohesion: 0.21
Nodes (8): CartPage(), CheckoutPage(), useCart(), ProductDetailPage(), ProductCardProps, CartItem, CartState, useCartStore

### Community 12 - "Staff Inventory & KPI Cards"
Cohesion: 0.18
Nodes (7): InventoryUpdateTableProps, QuickStockModalProps, StaffKpiCards(), StaffKpiCardsProps, staffProducts, ProductCardProps, Product

### Community 13 - "Staff Payment & Pickup Lists"
Cohesion: 0.16
Nodes (10): PaymentItem, PaymentPickupList(), PaymentPickupListProps, PickupItem, Tab, VerifyPickupModal(), VerifyPickupModalProps, staffPayments (+2 more)

### Community 14 - "Dashboard Sidebars & Topbar"
Cohesion: 0.19
Nodes (8): AdminTopbarProps, NAV_ITEMS, StaffSidebar(), StaffSidebarProps, ROUTE_TITLES, StaffTopbar(), StaffTopbarProps, ThemeToggle()

### Community 15 - "Staff Pickup Confirmation Modal"
Cohesion: 0.16
Nodes (11): ConfirmPickupModal(), ConfirmPickupModalProps, PickupItem, PickupOrder, PickupDetailsModal(), PickupDetailsModalProps, PickupItem, PickupOrder (+3 more)

### Community 16 - "Staff Transaction Feed & Table"
Cohesion: 0.20
Nodes (6): LiveTransactionFeed(), LiveTransactionFeedProps, StaffTransactionTable(), StaffTransactionTableProps, ReceiptModalProps, Transaction

### Community 17 - "BentaHub System Architecture Docs"
Cohesion: 0.15
Nodes (13): Graphify Knowledge Graph Rules, Admin User Workflow, Data Inventory Analytics Module, Cashier User Workflow, Centralized Monitoring Module, Customer User Workflow, Feature-Sliced Design (FSD) Architecture, QR & Point of Sale (POS) Module (+5 more)

### Community 18 - "Staff Stock Management"
Cohesion: 0.26
Nodes (6): AddStockModal(), AddStockModalProps, CATEGORIES, ProductForm, InventoryUpdateTable(), QuickStockModal()

### Community 19 - "Admin User Management Modals"
Cohesion: 0.19
Nodes (9): AddUserModal(), AddUserModalProps, DeleteUserModal(), DeleteUserModalProps, EditUserModal(), EditUserModalProps, UserData, mockUsers (+1 more)

### Community 20 - "Admin History & Transaction Table"
Cohesion: 0.17
Nodes (8): HistoryMetrics(), HistoryTable(), mockTransactions, Transaction, TransactionDetail, TransactionHistoryModal(), TransactionHistoryModalProps, TransactionItem

### Community 21 - "Customer Orders & History"
Cohesion: 0.24
Nodes (8): RecentOrdersTable(), TransactionTable(), useOrders(), ReservationsPage(), Order, OrderItem, OrdersState, useOrdersStore

### Community 22 - "Customer Catalog Sidebar & Pagination"
Cohesion: 0.24
Nodes (7): CatalogPage(), CategorySidebar(), Pagination(), useProducts(), Product, ProductsState, useProductsStore

### Community 23 - "Customer Reservation Summary"
Cohesion: 0.20
Nodes (5): ReservationCard(), ReservationCardProps, ReservationData, ReservationSummary(), TransactionFilters()

### Community 24 - "Branch Inventory Schema"
Cohesion: 0.18
Nodes (10): BranchInventory, branchInventoryRelations, InsertBranchInventory, insertBranchInventorySchema, selectBranchInventorySchema, Branch, branches, InsertBranch (+2 more)

### Community 25 - "Orders Schema"
Cohesion: 0.17
Nodes (11): InsertOrder, InsertOrderItem, insertOrderItemSchema, insertOrderSchema, Order, OrderItem, orderItemsRelations, ordersRelations (+3 more)

### Community 26 - "Admin Overview Analytics"
Cohesion: 0.24
Nodes (10): computeTrend(), formatCurrency(), getAdminOverview(), getMonthRange(), MONTH_NAMES, RawBranch, RawInventory, RawTransaction (+2 more)

### Community 27 - "Admin Reservations & Users Panel"
Cohesion: 0.20
Nodes (4): mockReservations, Reservation, ReservationTable(), UserTable()

### Community 28 - "Admin Payment History Modals"
Cohesion: 0.22
Nodes (6): PaymentDetailsModal(), PaymentDetailsModalProps, PaymentRecord, mockPayments, PaymentRecord, PaymentTable()

### Community 29 - "Admin Sales Analytics Actions"
Cohesion: 0.25
Nodes (8): formatCurrency(), getSalesData(), MONTH_NAMES, SalesFilterOptions, SalesOverview, SalesPageData, SalesTransactionRow, SalesTrendPoint

### Community 30 - "Cashier Layout & Navigation"
Cohesion: 0.28
Nodes (5): CashierSidebar(), CashierSidebarProps, NAV_ITEMS, CashierTopbar(), CashierTopbarProps

### Community 31 - "Admin Notifications Feed"
Cohesion: 0.22
Nodes (6): AdminNotificationsFeed(), badgeColorMap, borderColorMap, iconColorMap, mockNotifications, NotificationItem

### Community 32 - "Cashier Payments Panel"
Cohesion: 0.36
Nodes (4): PaymentSummaryCards(), PaymentsTable(), payments, Payment

### Community 34 - "Customer Notifications Feed"
Cohesion: 0.25
Nodes (5): CustomerNotificationItem, CustomerNotificationsFeed(), FilterTab, mockNotifications, tabs

### Community 35 - "Transactions Schema"
Cohesion: 0.25
Nodes (7): paymentMethodEnum, InsertTransaction, insertTransactionSchema, selectTransactionSchema, Transaction, transactionRelations, transactionStatusEnum

### Community 36 - "Admin Database Seeding"
Cohesion: 0.29
Nodes (7): transactions, BRANCHES, CATEGORIES, envPath, generateId(), PRODUCTS, seedData()

### Community 37 - "Authentication & Setup Documentation"
Cohesion: 0.29
Nodes (7): Backend Setup Instructions, Users Database Table Schema, Email Verification Codes Table Schema, Implemented Authentication & Security, Implemented Email Verification Codes Table Schema, Route Protection Middleware, Implemented Users Table Schema

### Community 38 - "Notifications Hook & Zustand Store"
Cohesion: 0.43
Nodes (4): useNotifications(), Notification, NotificationsState, useNotificationsStore

### Community 39 - "Admin Sidebar Layout"
Cohesion: 0.33
Nodes (3): AdminSidebar(), AdminSidebarProps, AdminTopbar()

### Community 40 - "Staff Notifications Feed"
Cohesion: 0.40
Nodes (3): mockNotifications, StaffNotificationItem, StaffNotificationsFeed()

### Community 41 - "Products Schema"
Cohesion: 0.33
Nodes (5): InsertProduct, insertProductSchema, Product, productStockStatusEnum, selectProductSchema

### Community 45 - "Docker Configuration & Setup"
Cohesion: 0.50
Nodes (4): Next.js App Service (Docker), Postgres Database Service (Docker), Docker Support, Local Development Setup

### Community 46 - "Notifications Types"
Cohesion: 0.50
Nodes (3): Notification, NotificationCategory, NotificationSeverity

## Knowledge Gaps
- **204 isolated node(s):** `eslintConfig`, `config`, `pool`, `pool`, `pool` (+199 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ThemeToggle()` connect `Dashboard Sidebars & Topbar` to `Customer Dashboard Navigation & Header`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Why does `useAuth()` connect `Customer Dashboard Navigation & Header` to `Customer Checkout & Cart Store`, `Customer Orders & History`, `Notifications Hook & Zustand Store`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Why does `AuthHeader()` connect `Root Layout & Typography` to `User Registration & Verification`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `verifyToken()` (e.g. with `PATCH()` and `GET()`) actually correct?**
  _`verifyToken()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `extractToken()` (e.g. with `PATCH()` and `GET()`) actually correct?**
  _`extractToken()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `eslintConfig`, `config`, `pool` to the rest of the system?**
  _206 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `User Registration & Verification` be split into smaller, more focused modules?**
  _Cohesion score 0.07811921510551648 - nodes in this community are weakly interconnected._