# Graph Report - bentahub  (2026-06-28)

## Corpus Check
- 236 files · ~80,030 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 888 nodes · 1464 edges · 66 communities (51 shown, 15 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a1550d23`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_POS and Order Actions|POS and Order Actions]]
- [[_COMMUNITY_Transaction Table Components|Transaction Table Components]]
- [[_COMMUNITY_App Entry and Theme Config|App Entry and Theme Config]]
- [[_COMMUNITY_Project System & Agent Rules|Project System & Agent Rules]]
- [[_COMMUNITY_Dashboard Sidebar Layouts|Dashboard Sidebar Layouts]]
- [[_COMMUNITY_Landing Page Branch Grids|Landing Page Branch Grids]]
- [[_COMMUNITY_Dashboard Analytics Charts|Dashboard Analytics Charts]]
- [[_COMMUNITY_Relational DB Schemas|Relational DB Schemas]]
- [[_COMMUNITY_Sales Charts and Metrics|Sales Charts and Metrics]]
- [[_COMMUNITY_User Registration Flows|User Registration Flows]]
- [[_COMMUNITY_User CRUD Admin Modals|User CRUD Admin Modals]]
- [[_COMMUNITY_Inventory Monitoring Table|Inventory Monitoring Table]]
- [[_COMMUNITY_Product Detail View UI|Product Detail View UI]]
- [[_COMMUNITY_DB Connection & Seeding Setup|DB Connection & Seeding Setup]]
- [[_COMMUNITY_Pickup Order Confirm Modals|Pickup Order Confirm Modals]]
- [[_COMMUNITY_Stock Summary Cards UI|Stock Summary Cards UI]]
- [[_COMMUNITY_Pickups Dashboard Manager|Pickups Dashboard Manager]]
- [[_COMMUNITY_Reservations Dashboard Manager|Reservations Dashboard Manager]]
- [[_COMMUNITY_Branch Inventory & Product Schema|Branch Inventory & Product Schema]]
- [[_COMMUNITY_Payments and Pickups UI|Payments and Pickups UI]]
- [[_COMMUNITY_User Authentication Forms|User Authentication Forms]]
- [[_COMMUNITY_Stock Check Management Flow|Stock Check Management Flow]]
- [[_COMMUNITY_GCash & Cash POS Payments|GCash & Cash POS Payments]]
- [[_COMMUNITY_Forgot Password UI Forms|Forgot Password UI Forms]]
- [[_COMMUNITY_Password Reset Backend Services|Password Reset Backend Services]]
- [[_COMMUNITY_Walk-in & Reservation Cart UI|Walk-in & Reservation Cart UI]]
- [[_COMMUNITY_Cart Zustand State Hook|Cart Zustand State Hook]]
- [[_COMMUNITY_Cart Items Local Storage Store|Cart Items Local Storage Store]]
- [[_COMMUNITY_Database Transaction Schemas|Database Transaction Schemas]]
- [[_COMMUNITY_Email Verification Backend Actions|Email Verification Backend Actions]]
- [[_COMMUNITY_User Branches Relational Schema|User Branches Relational Schema]]
- [[_COMMUNITY_Order Pickup Verification Modals|Order Pickup Verification Modals]]
- [[_COMMUNITY_Drizzle Migration Script & Utils|Drizzle Migration Script & Utils]]
- [[_COMMUNITY_Notification Store Hooks|Notification Store Hooks]]
- [[_COMMUNITY_GCash POS Callback UI|GCash POS Callback UI]]
- [[_COMMUNITY_GCash POS Callback Actions|GCash POS Callback Actions]]
- [[_COMMUNITY_Notifications Center Popovers|Notifications Center Popovers]]
- [[_COMMUNITY_Admin Sales Chart Queries|Admin Sales Chart Queries]]
- [[_COMMUNITY_GCash POS Processing Schemas|GCash POS Processing Schemas]]
- [[_COMMUNITY_Shared Dashboard Settings Panel|Shared Dashboard Settings Panel]]
- [[_COMMUNITY_Product Hooks and Store State|Product Hooks and Store State]]
- [[_COMMUNITY_Sales Reporting Analytics Queries|Sales Reporting Analytics Queries]]
- [[_COMMUNITY_FSD Architecture Guidelines|FSD Architecture Guidelines]]
- [[_COMMUNITY_Payment Details Tables|Payment Details Tables]]
- [[_COMMUNITY_System Notifications DB Schema|System Notifications DB Schema]]
- [[_COMMUNITY_Admin Notifications Feeds|Admin Notifications Feeds]]
- [[_COMMUNITY_Payments Tables & Metrics UI|Payments Tables & Metrics UI]]
- [[_COMMUNITY_Shared History Log Queries|Shared History Log Queries]]
- [[_COMMUNITY_Customer Notifications Feeds|Customer Notifications Feeds]]
- [[_COMMUNITY_Branch Inventory Table Component|Branch Inventory Table Component]]
- [[_COMMUNITY_System Notifications Models|System Notifications Models]]
- [[_COMMUNITY_Authentication Component Layout|Authentication Component Layout]]
- [[_COMMUNITY_PostgreSQL Docker Services|PostgreSQL Docker Services]]
- [[_COMMUNITY_Verification Flow Concepts|Verification Flow Concepts]]
- [[_COMMUNITY_ESLint Configuration Patterns|ESLint Configuration Patterns]]
- [[_COMMUNITY_PostCSS Styling Setup|PostCSS Styling Setup]]
- [[_COMMUNITY_Admin Page Workflows|Admin Page Workflows]]
- [[_COMMUNITY_Customer Page Workflows|Customer Page Workflows]]
- [[_COMMUNITY_Employee Page Workflows|Employee Page Workflows]]
- [[_COMMUNITY_FSD Architectural Boundaries|FSD Architectural Boundaries]]
- [[_COMMUNITY_Verification Relational Tables|Verification Relational Tables]]

## God Nodes (most connected - your core abstractions)
1. `useAuth()` - 44 edges
2. `getAuthenticatedUser()` - 23 edges
3. `db` - 22 edges
4. `Feature Sliced Design (FSD) Architecture Guidelines` - 18 edges
5. `Feature Sliced Design (FSD) Guidelines` - 17 edges
6. `Product` - 15 edges
7. `Transaction` - 13 edges
8. `useCart()` - 12 edges
9. `users` - 10 edges
10. `getStockStatus()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `🎨 Layout & Provider Pattern` --rationale_for--> `RootLayout()`  [EXTRACTED]
  docs/FEATURE-SLICED-DESIGN.md → src/app/layout.tsx
- `PostgreSQL DB Service` --shares_data_with--> `Database Seeding & Reset`  [INFERRED]
  docker-compose.yml → docs/RUNBOOK.md
- `AdminPage()` --calls--> `useAuth()`  [EXTRACTED]
  src/app/(dashboard)/admin/page.tsx → src/hooks/useAuth.ts
- `EmployeeTopbar()` --calls--> `useAuth()`  [EXTRACTED]
  src/features/employee-dashboard/components/employee-topbar.tsx → src/hooks/useAuth.ts
- `ProductCard()` --calls--> `getStockStatus()`  [INFERRED]
  src/features/employee-dashboard/components/product-card.tsx → src/features/employee-dashboard/data/products.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Authentication & Authorization Architecture** — components_auth_provider, hooks_useauth, src_proxy, lib_auth_utils, lib_auth_edge_utils [INFERRED 0.95]
- **Database Layer Configuration** — drizzle_schema, drizzle_db, drizzle_seed, drizzle_config [INFERRED 0.95]

## Communities (66 total, 15 thin omitted)

### Community 0 - "POS and Order Actions"
Cohesion: 0.05
Nodes (63): addToCart(), loginAction(), verifySessionAction(), cancelOrder(), createOrder(), markAllNotificationsRead(), markNotificationRead(), MarkNotificationReadResult (+55 more)

### Community 1 - "Transaction Table Components"
Cohesion: 0.10
Nodes (18): EmployeeTransactionTable(), EmployeeTransactionTableProps, LiveTransactionFeed(), LiveTransactionFeedProps, allTransactions, employeePayments, employeePickups, GetTransactionsParams (+10 more)

### Community 2 - "App Entry and Theme Config"
Cohesion: 0.06
Nodes (21): logoutAction(), verifyResetCode(), fontMono, fontSans, fontSerif, metadata, AuthHeader(), CreateNewPasswordForm() (+13 more)

### Community 3 - "Project System & Agent Rules"
Cohesion: 0.05
Nodes (39): App structure (`src/app/`), Architecture & FSD rules, Auth & security, Commands, Feature-Sliced Design Rules, graphify, Graphify Instructions, Known gotchas (+31 more)

### Community 4 - "Dashboard Sidebar Layouts"
Cohesion: 0.15
Nodes (14): AdminLayout(), AdminSidebar(), AdminSidebarProps, DashboardSidebar(), DashboardSidebarProps, EmployeeSidebar(), EmployeeSidebarProps, NAV_ITEMS (+6 more)

### Community 5 - "Landing Page Branch Grids"
Cohesion: 0.07
Nodes (23): AuthHeaderProps, branches, BranchGrid(), CtaBanner(), Footer(), HeroSection(), Navbar(), ProductGrid() (+15 more)

### Community 6 - "Dashboard Analytics Charts"
Cohesion: 0.13
Nodes (12): HistoryMetrics(), InventoryFlowTrend(), PaymentMetrics(), PickupMetrics(), ReservationFilters(), ReservationMetrics(), mockReservations, Reservation (+4 more)

### Community 7 - "Relational DB Schemas"
Cohesion: 0.17
Nodes (10): CartItem, cartItemsRelations, InsertCartItem, insertCartItemSchema, selectCartItemSchema, InsertUser, insertUserSchema, selectUserSchema (+2 more)

### Community 8 - "Sales Charts and Metrics"
Cohesion: 0.67
Nodes (3): SalesMetrics(), SalesMetricsProps, SalesOverviewData

### Community 9 - "User Registration Flows"
Cohesion: 0.22
Nodes (8): demoOrders, RecentOrdersTable(), TransactionTable(), Order, OrderItem, OrdersState, useOrdersStore, useOrders()

### Community 10 - "User CRUD Admin Modals"
Cohesion: 0.19
Nodes (9): AddUserModal(), AddUserModalProps, DeleteUserModal(), DeleteUserModalProps, EditUserModal(), EditUserModalProps, UserData, mockUsers (+1 more)

### Community 11 - "Inventory Monitoring Table"
Cohesion: 0.06
Nodes (40): AdminPage(), BranchStockItem, BranchStockOverview(), BranchStockOverviewProps, STATUS_COLORS, InventoryStatusTable(), InventoryStatusTableProps, MonitoringMetrics() (+32 more)

### Community 12 - "Product Detail View UI"
Cohesion: 0.13
Nodes (13): ProductActions(), ProductActionsProps, ProductBreadcrumb(), ProductBreadcrumbProps, ProductDetailsSection(), ProductDetailsSectionProps, ProductImageGallery(), ProductImageGalleryProps (+5 more)

### Community 13 - "DB Connection & Seeding Setup"
Cohesion: 0.33
Nodes (6): BRANCHES, envPath, generateId(), PRODUCTS, seedData(), USERS

### Community 14 - "Pickup Order Confirm Modals"
Cohesion: 0.15
Nodes (12): ConfirmPickupModal(), ConfirmPickupModalProps, PickupItem, PickupOrder, PickupDetailsModal(), PickupDetailsModalProps, PickupItem, PickupOrder (+4 more)

### Community 15 - "Stock Summary Cards UI"
Cohesion: 0.16
Nodes (10): EmployeeKpiCards(), EmployeeKpiCardsProps, InventoryUpdateTableProps, QuickStockModalProps, StockSummaryCards(), allProducts, getStockStatus(), ProductCard() (+2 more)

### Community 16 - "Pickups Dashboard Manager"
Cohesion: 0.14
Nodes (9): mockPayments, mockPickups, PaymentItem, PickupItem, PickupsManager(), Tab, GetPickupsParams, GetPickupsResult (+1 more)

### Community 17 - "Reservations Dashboard Manager"
Cohesion: 0.14
Nodes (9): CustomerTab, mockReservations, ReservationData, ReservationsManager(), statusLabels, statusStyles, GetReservationsParams, GetReservationsResult (+1 more)

### Community 18 - "Branch Inventory & Product Schema"
Cohesion: 0.29
Nodes (6): BranchInventory, branchInventoryRelations, InsertBranchInventory, insertBranchInventorySchema, selectBranchInventorySchema, transactions

### Community 19 - "Payments and Pickups UI"
Cohesion: 0.13
Nodes (15): 1. Tech Stack, 2. User Workflows & Permission Loops, 3. System Rules & Constraints, 4. Backend & Auth Implementation, 5. Directory & FSD Guidelines, 👑 Admin Workflow (`src/app/(dashboard)/admin/`), BentaHub — Unified Developer Reference Manual, 🛑 Coding & Import Rules (+7 more)

### Community 20 - "User Authentication Forms"
Cohesion: 0.15
Nodes (12): InsertOrder, InsertOrderItem, insertOrderItemSchema, insertOrderSchema, Order, OrderItem, orderItems, orderItemsRelations (+4 more)

### Community 21 - "Stock Check Management Flow"
Cohesion: 0.28
Nodes (5): CartPage(), CheckoutPage(), useCart(), ProductDetailPage(), ProductCardProps

### Community 22 - "GCash & Cash POS Payments"
Cohesion: 0.15
Nodes (8): mockPayments, PaymentItem, PaymentMethod, PaymentsManager(), PaymentStatus, GetPaymentsParams, GetPaymentsResult, PaymentRecord

### Community 23 - "Forgot Password UI Forms"
Cohesion: 0.14
Nodes (14): 1. Prerequisites, 2. Configure Environment Variables, 3. Install Dependencies, 4. Database Setup, 5. Run the Development Server, BentaHub — Centralized Inventory Management and POS System, Direct Docker Compose Commands, Docker Helper Scripts (+6 more)

### Community 24 - "Password Reset Backend Services"
Cohesion: 0.15
Nodes (12): Branch, branches, InsertBranch, insertBranchSchema, selectBranchSchema, paymentMethodEnum, InsertTransaction, insertTransactionSchema (+4 more)

### Community 25 - "Walk-in & Reservation Cart UI"
Cohesion: 0.13
Nodes (16): AddStockModal(), AddStockModalProps, CATEGORIES, ProductForm, EmployeeNotificationItem, EmployeeNotificationsFeed(), mockNotifications, InventoryUpdateTable() (+8 more)

### Community 26 - "Cart Zustand State Hook"
Cohesion: 0.16
Nodes (10): AlertItem, InventoryRow, LiveTransaction, mockAlerts, mockBranches, mockInventory, mockLiveTransactions, MonitoringDashboard() (+2 more)

### Community 27 - "Cart Items Local Storage Store"
Cohesion: 0.33
Nodes (5): EmailVerificationCode, emailVerificationRelations, InsertEmailVerificationCode, insertEmailVerificationSchema, selectEmailVerificationSchema

### Community 28 - "Database Transaction Schemas"
Cohesion: 0.21
Nodes (11): CartItem(), CartItemProps, CartSidebar(), CartSidebarProps, CATEGORIES, ProductCatalog(), ProductCatalogProps, useCart() (+3 more)

### Community 29 - "Email Verification Backend Actions"
Cohesion: 0.21
Nodes (5): FilterTab, NotificationItem, NotificationsFeed(), roleLabels, roleToBuilder

### Community 30 - "User Branches Relational Schema"
Cohesion: 0.23
Nodes (8): AdminTopbar(), AdminTopbarProps, DashboardTopbar(), getInitials(), EmployeeTopbar(), EmployeeTopbarProps, ROUTE_TITLES, ThemeToggle()

### Community 31 - "Order Pickup Verification Modals"
Cohesion: 0.33
Nodes (5): InsertProduct, insertProductSchema, Product, productStockStatusEnum, selectProductSchema

### Community 33 - "Notification Store Hooks"
Cohesion: 0.24
Nodes (8): DashboardMobileNav(), DashboardMobileNavProps, DashboardLayout(), getPageTitleAndSubtitle(), NavLink, NavSection, ROLE_NAV_ITEMS, ROLE_TITLES

### Community 35 - "GCash POS Callback Actions"
Cohesion: 0.20
Nodes (4): customerOrders, employeeTransactions, MockTransaction, TransactionsList()

### Community 36 - "Notifications Center Popovers"
Cohesion: 0.25
Nodes (6): mockTransactions, Transaction, TransactionDetail, TransactionHistoryModal(), TransactionHistoryModalProps, TransactionItem

### Community 37 - "Admin Sales Chart Queries"
Cohesion: 0.11
Nodes (7): CatalogToolbar(), CategorySidebar(), NearbyBranches(), Pagination(), ReservationCardProps, ReservationData, SummaryCards()

### Community 39 - "Shared Dashboard Settings Panel"
Cohesion: 0.25
Nodes (3): SettingsPanel(), GetSettingsParams, SettingsData

### Community 40 - "Product Hooks and Store State"
Cohesion: 0.22
Nodes (10): CatalogPage(), demoProducts, getProductById(), getProducts(), ProductFilters, Product, ProductsState, useProductsStore (+2 more)

### Community 41 - "Sales Reporting Analytics Queries"
Cohesion: 0.25
Nodes (8): formatCurrency(), getSalesData(), MONTH_NAMES, SalesFilterOptions, SalesOverview, SalesPageData, SalesTransactionRow, SalesTrendPoint

### Community 42 - "FSD Architecture Guidelines"
Cohesion: 0.05
Nodes (56): createCustomerPortalSession, RootLayout(), HasPermission, getProducts, getProductsInternal, 1. Caching Strategy & Public/Internal Split, 2. Cache Tagging Levels, 3. Mutations & Revalidation Pattern (+48 more)

### Community 44 - "Payment Details Tables"
Cohesion: 0.29
Nodes (6): PaymentDetailsModal(), PaymentDetailsModalProps, PaymentRecord, mockPayments, PaymentRecord, PaymentTable()

### Community 46 - "System Notifications DB Schema"
Cohesion: 0.29
Nodes (6): InsertNotification, insertNotificationSchema, Notification, notificationsRelations, notificationTypeEnum, selectNotificationSchema

### Community 50 - "Admin Notifications Feeds"
Cohesion: 0.29
Nodes (6): AdminNotificationsFeed(), badgeColorMap, borderColorMap, iconColorMap, mockNotifications, NotificationItem

### Community 56 - "Customer Notifications Feeds"
Cohesion: 0.33
Nodes (4): CustomerNotificationItem, FilterTab, mockNotifications, tabs

### Community 68 - "System Notifications Models"
Cohesion: 0.50
Nodes (3): Notification, NotificationCategory, NotificationSeverity

### Community 70 - "PostgreSQL Docker Services"
Cohesion: 0.67
Nodes (3): Adminer DB Client Service, PostgreSQL DB Service, Database Seeding & Reset

## Knowledge Gaps
- **322 isolated node(s):** `envPath`, `eslintConfig`, `config`, `metadata`, `demoProducts` (+317 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useAuth()` connect `Dashboard Sidebar Layouts` to `POS and Order Actions`, `Notification Store Hooks`, `GCash POS Callback UI`, `GCash POS Callback Actions`, `Shared Dashboard Settings Panel`, `User Registration Flows`, `Inventory Monitoring Table`, `Pickups Dashboard Manager`, `Reservations Dashboard Manager`, `Stock Check Management Flow`, `GCash & Cash POS Payments`, `Cart Zustand State Hook`, `Email Verification Backend Actions`, `User Branches Relational Schema`?**
  _High betweenness centrality (0.205) - this node is a cross-community bridge._
- **Why does `Auth & security` connect `Project System & Agent Rules` to `POS and Order Actions`, `Dashboard Sidebar Layouts`?**
  _High betweenness centrality (0.138) - this node is a cross-community bridge._
- **What connects `envPath`, `eslintConfig`, `config` to the rest of the system?**
  _325 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `POS and Order Actions` be split into smaller, more focused modules?**
  _Cohesion score 0.05423094904160823 - nodes in this community are weakly interconnected._
- **Should `Transaction Table Components` be split into smaller, more focused modules?**
  _Cohesion score 0.09655172413793103 - nodes in this community are weakly interconnected._
- **Should `App Entry and Theme Config` be split into smaller, more focused modules?**
  _Cohesion score 0.06363636363636363 - nodes in this community are weakly interconnected._
- **Should `Project System & Agent Rules` be split into smaller, more focused modules?**
  _Cohesion score 0.047872340425531915 - nodes in this community are weakly interconnected._