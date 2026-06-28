# Graph Report - bentahub  (2026-06-28)

## Corpus Check
- 235 files · ~77,298 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 895 nodes · 1606 edges · 72 communities (62 shown, 10 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `18df64e5`
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
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Order Pickup Verification Modals|Order Pickup Verification Modals]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Notification Store Hooks|Notification Store Hooks]]
- [[_COMMUNITY_GCash POS Callback UI|GCash POS Callback UI]]
- [[_COMMUNITY_GCash POS Callback Actions|GCash POS Callback Actions]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Admin Sales Chart Queries|Admin Sales Chart Queries]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Shared Dashboard Settings Panel|Shared Dashboard Settings Panel]]
- [[_COMMUNITY_Product Hooks and Store State|Product Hooks and Store State]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_FSD Architecture Guidelines|FSD Architecture Guidelines]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Payment Details Tables|Payment Details Tables]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_System Notifications DB Schema|System Notifications DB Schema]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Payments Tables & Metrics UI|Payments Tables & Metrics UI]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 61|Community 61]]
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
1. `useAuth()` - 35 edges
2. `db` - 28 edges
3. `getAuthenticatedUser()` - 23 edges
4. `Feature Sliced Design (FSD) Architecture Guidelines` - 18 edges
5. `Feature Sliced Design (FSD) Guidelines` - 17 edges
6. `Product` - 15 edges
7. `users` - 13 edges
8. `useCart()` - 13 edges
9. `Transaction` - 13 edges
10. `registerUser()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `🎨 Layout & Provider Pattern` --rationale_for--> `RootLayout()`  [EXTRACTED]
  docs/FEATURE-SLICED-DESIGN.md → src/app/layout.tsx
- `PostgreSQL DB Service` --shares_data_with--> `Database Seeding & Reset`  [INFERRED]
  docker-compose.yml → docs/RUNBOOK.md
- `SalesPage()` --calls--> `useAuth()`  [EXTRACTED]
  src/app/(dashboard)/admin/(management)/sales/page.tsx → src/hooks/useAuth.ts
- `AdminPage()` --calls--> `useAuth()`  [EXTRACTED]
  src/app/(dashboard)/admin/page.tsx → src/hooks/useAuth.ts
- `CustomerPage()` --calls--> `useAuth()`  [EXTRACTED]
  src/app/(dashboard)/customer/page.tsx → src/hooks/useAuth.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Authentication & Authorization Architecture** — components_auth_provider, hooks_useauth, src_proxy, lib_auth_utils, lib_auth_edge_utils [INFERRED 0.95]
- **Database Layer Configuration** — drizzle_schema, drizzle_db, drizzle_seed, drizzle_config [INFERRED 0.95]

## Communities (72 total, 10 thin omitted)

### Community 0 - "POS and Order Actions"
Cohesion: 0.17
Nodes (20): addToCart(), removeCartItem(), updateCartItem(), Schema & DB, getCartItemByUserAndId(), getCartItemByUserAndProduct(), getProductForCart(), addProductToCart() (+12 more)

### Community 1 - "Transaction Table Components"
Cohesion: 0.09
Nodes (18): EmployeeTransactionTable(), EmployeeTransactionTableProps, LiveTransactionFeed(), LiveTransactionFeedProps, TransactionFilters(), TransactionDetail, TransactionHistoryModal(), TransactionHistoryModalProps (+10 more)

### Community 2 - "App Entry and Theme Config"
Cohesion: 0.19
Nodes (20): registerUser(), resendVerificationCodeAction(), verifyEmailAction(), createUser(), getUserByEmail(), createVerificationCode(), deleteVerificationCodesByUserId(), getVerificationCodeByUserId() (+12 more)

### Community 3 - "Project System & Agent Rules"
Cohesion: 0.05
Nodes (40): App structure (`src/app/`), Architecture & FSD rules, Auth & security, Commands, Feature-Sliced Design Rules, graphify, Graphify Instructions, Known gotchas (+32 more)

### Community 4 - "Dashboard Sidebar Layouts"
Cohesion: 0.46
Nodes (4): AdminLayout(), CustomerLayout(), EmployeeLayout(), useAuth()

### Community 5 - "Landing Page Branch Grids"
Cohesion: 0.11
Nodes (10): branches, BranchGrid(), CtaBanner(), Footer(), HeroSection(), Navbar(), ProductGrid(), products (+2 more)

### Community 6 - "Dashboard Analytics Charts"
Cohesion: 0.07
Nodes (26): CheckoutPage(), OrdersCountCard(), OrdersCountCardProps, demoOrders, RecentOrdersTable(), ReservationCard(), ReservationCardProps, ReservationData (+18 more)

### Community 7 - "Relational DB Schemas"
Cohesion: 0.33
Nodes (5): CartItem, cartItemsRelations, InsertCartItem, insertCartItemSchema, selectCartItemSchema

### Community 8 - "Sales Charts and Metrics"
Cohesion: 0.05
Nodes (34): logoutAction(), verifyResetCode(), fontMono, fontSans, fontSerif, metadata, AuthHeader(), AuthHeaderProps (+26 more)

### Community 9 - "User Registration Flows"
Cohesion: 0.29
Nodes (7): Build-Time Bypass, 📂 Directory Structure Overview, 🔒 Environment Variable Validation, 🏗️ Feature-First Mini-Applications, Feature Sliced Design (FSD) Architecture Guidelines, 📖 Table of Contents, 📈 The Rule of Promotion

### Community 10 - "User CRUD Admin Modals"
Cohesion: 0.18
Nodes (11): AddUserModal(), AddUserModalProps, DeleteUserModal(), DeleteUserModalProps, EditUserModal(), EditUserModalProps, UserData, UserMetrics() (+3 more)

### Community 11 - "Inventory Monitoring Table"
Cohesion: 0.19
Nodes (14): markAllNotificationsRead(), markNotificationRead(), MarkNotificationReadResult, getNotifications(), GetNotificationsParams, GetNotificationsResult, getOrderById(), getOrders() (+6 more)

### Community 12 - "Product Detail View UI"
Cohesion: 0.13
Nodes (13): ProductActions(), ProductActionsProps, ProductBreadcrumb(), ProductBreadcrumbProps, ProductDetailsSection(), ProductDetailsSectionProps, ProductImageGallery(), ProductImageGalleryProps (+5 more)

### Community 13 - "DB Connection & Seeding Setup"
Cohesion: 0.33
Nodes (5): InsertUser, insertUserSchema, selectUserSchema, User, userRoleEnum

### Community 14 - "Pickup Order Confirm Modals"
Cohesion: 0.08
Nodes (25): ConfirmPickupModal(), ConfirmPickupModalProps, PickupItem, PickupOrder, PaymentItem, PaymentPickupList(), PaymentPickupListProps, PickupItem (+17 more)

### Community 16 - "Pickups Dashboard Manager"
Cohesion: 0.22
Nodes (6): mockPayments, mockPickups, PaymentItem, PickupItem, PickupsManager(), Tab

### Community 17 - "Reservations Dashboard Manager"
Cohesion: 0.22
Nodes (6): CustomerTab, mockReservations, ReservationData, ReservationsManager(), statusLabels, statusStyles

### Community 18 - "Branch Inventory & Product Schema"
Cohesion: 0.16
Nodes (12): BRANCHES, envPath, generateId(), PRODUCTS, seedData(), USERS, BranchInventory, branchInventoryRelations (+4 more)

### Community 19 - "Payments and Pickups UI"
Cohesion: 0.13
Nodes (15): 1. Tech Stack, 2. User Workflows & Permission Loops, 3. System Rules & Constraints, 4. Backend & Auth Implementation, 5. Directory & FSD Guidelines, 👑 Admin Workflow (`src/app/(dashboard)/admin/`), BentaHub — Unified Developer Reference Manual, 🛑 Coding & Import Rules (+7 more)

### Community 20 - "User Authentication Forms"
Cohesion: 0.17
Nodes (11): InsertOrder, InsertOrderItem, insertOrderItemSchema, insertOrderSchema, Order, OrderItem, orderItemsRelations, ordersRelations (+3 more)

### Community 21 - "Stock Check Management Flow"
Cohesion: 0.67
Nodes (3): Key Rules, Snippet: Form Zod Schemas with Transformations & Refinement, 📋 Zod Schema Patterns

### Community 22 - "GCash & Cash POS Payments"
Cohesion: 0.25
Nodes (5): mockPayments, PaymentItem, PaymentMethod, PaymentsManager(), PaymentStatus

### Community 23 - "Forgot Password UI Forms"
Cohesion: 0.14
Nodes (14): 1. Prerequisites, 2. Configure Environment Variables, 3. Install Dependencies, 4. Database Setup, 5. Run the Development Server, BentaHub — Centralized Inventory Management and POS System, Direct Docker Compose Commands, Docker Helper Scripts (+6 more)

### Community 24 - "Password Reset Backend Services"
Cohesion: 0.25
Nodes (7): paymentMethodEnum, InsertTransaction, insertTransactionSchema, selectTransactionSchema, Transaction, transactionRelations, transactionStatusEnum

### Community 25 - "Walk-in & Reservation Cart UI"
Cohesion: 0.22
Nodes (8): AddStockModal(), AddStockModalProps, CATEGORIES, ProductForm, InventoryUpdateTable(), InventoryUpdateTableProps, QuickStockModal(), QuickStockModalProps

### Community 26 - "Cart Zustand State Hook"
Cohesion: 0.20
Nodes (9): MonitoringDashboard(), MonitoringMetrics(), MonitoringMetricsProps, SystemAlerts(), SystemAlertsProps, getMonitoring(), MonitoringSummary, MonitoringMetricsData (+1 more)

### Community 27 - "Cart Items Local Storage Store"
Cohesion: 0.33
Nodes (5): EmailVerificationCode, emailVerificationRelations, InsertEmailVerificationCode, insertEmailVerificationSchema, selectEmailVerificationSchema

### Community 28 - "Database Transaction Schemas"
Cohesion: 0.32
Nodes (9): CartItem(), CartItemProps, CartSidebar(), CartSidebarProps, ProductCatalog(), useCart(), UseCartReturn, EmployeePosPage() (+1 more)

### Community 29 - "Email Verification Backend Actions"
Cohesion: 0.08
Nodes (19): AdminNotificationsFeed(), badgeColorMap, borderColorMap, iconColorMap, mockNotifications, NotificationItem, CustomerNotificationItem, CustomerNotificationsFeed() (+11 more)

### Community 30 - "Community 30"
Cohesion: 0.21
Nodes (12): loginAction(), verifySessionAction(), getSharedUserById(), extractToken(), generateToken(), JWT_SECRET, RequestLike, TokenPayload (+4 more)

### Community 31 - "Order Pickup Verification Modals"
Cohesion: 0.33
Nodes (5): InsertProduct, insertProductSchema, Product, productStockStatusEnum, selectProductSchema

### Community 32 - "Community 32"
Cohesion: 0.16
Nodes (12): BranchStockItem, BranchStockOverview(), BranchStockOverviewProps, STATUS_COLORS, BranchOption, SalesFilters(), SalesFiltersProps, SalesMetrics() (+4 more)

### Community 33 - "Notification Store Hooks"
Cohesion: 0.21
Nodes (9): ThemeToggle(), DashboardLayout(), getPageTitleAndSubtitle(), NavLink, NavSection, ROLE_NAV_ITEMS, ROLE_TITLES, DashboardMobileNav() (+1 more)

### Community 34 - "GCash POS Callback UI"
Cohesion: 0.15
Nodes (18): AdminPage(), SalesChart(), SalesChartProps, computeTrend(), formatCurrency(), getAdminOverview(), getMonthRange(), MONTH_NAMES (+10 more)

### Community 35 - "GCash POS Callback Actions"
Cohesion: 0.25
Nodes (4): customerOrders, employeeTransactions, MockTransaction, TransactionsList()

### Community 36 - "Community 36"
Cohesion: 0.27
Nodes (10): cancelOrder(), createOrder(), cancelOrderById(), createOrderTransaction(), getCartItemsByUserId(), getOrderByIdAndUserId(), orderItems, orders (+2 more)

### Community 37 - "Admin Sales Chart Queries"
Cohesion: 0.13
Nodes (12): AdminStockTable(), AdminStockTableProps, BranchStockRow, CatalogToolbar(), CategorySidebar(), InventoryFlowTrend(), LowStockCard(), LowStockCardProps (+4 more)

### Community 38 - "Community 38"
Cohesion: 0.24
Nodes (6): HistoryMetrics(), HistoryItem, HistoryTable(), mockData, getHistory(), HistoryRecord

### Community 39 - "Shared Dashboard Settings Panel"
Cohesion: 0.25
Nodes (3): SettingsPanel(), GetSettingsParams, SettingsData

### Community 40 - "Product Hooks and Store State"
Cohesion: 0.14
Nodes (18): CartPage(), CatalogPage(), demoProducts, ProductCard(), ProductCardProps, getCart(), getProductById(), getProducts() (+10 more)

### Community 41 - "Community 41"
Cohesion: 0.22
Nodes (9): formatCurrency(), getSalesData(), MONTH_NAMES, SalesFilterOptions, SalesOverview, SalesPageData, SalesTransactionRow, SalesTrendPoint (+1 more)

### Community 42 - "FSD Architecture Guidelines"
Cohesion: 0.20
Nodes (10): 🌐 API Route Patterns, 🏗️ Drizzle Schema Definition Patterns, Key Rules, Key Rules, Key Rules, ⚡ Server Action Patterns, Snippet: Cryptographic Webhook Handler (Clerk Webhook), Snippet: Edge API Route (discount banner script generator) (+2 more)

### Community 43 - "Community 43"
Cohesion: 0.38
Nodes (7): Feature Sliced Design Architecture, Feature Sliced Design (FSD) Guidelines, 🧩 Feature Component Patterns, 🛑 Import Boundary Rules, Key Rules, Rule of Promotion, Snippet: Standard Client Form Component

### Community 44 - "Payment Details Tables"
Cohesion: 0.12
Nodes (15): PaymentDetailsModal(), PaymentDetailsModalProps, PaymentRecord, PaymentMetrics(), PaymentSummaryCards(), mockPayments, PaymentRecord, PaymentTable() (+7 more)

### Community 45 - "Community 45"
Cohesion: 0.29
Nodes (6): forgotPasswordSchema, registerSchema, resendCodeSchema, resetPasswordSchema, verifyEmailSchema, verifyResetCodeSchema

### Community 46 - "System Notifications DB Schema"
Cohesion: 0.29
Nodes (6): InsertNotification, insertNotificationSchema, Notification, notificationsRelations, notificationTypeEnum, selectNotificationSchema

### Community 47 - "Community 47"
Cohesion: 0.25
Nodes (7): AlertItem, InventoryRow, LiveTransaction, mockAlerts, mockBranches, mockInventory, mockLiveTransactions

### Community 48 - "Community 48"
Cohesion: 0.22
Nodes (10): getProducts, getProductsInternal, 1. Caching Strategy & Public/Internal Split, 2. Cache Tagging Levels, 3. Mutations & Revalidation Pattern, 4. Code Reuse vs. Coupling: The Promotion Pattern, ⚡ DB Caching & Query Patterns, Example: Promoted Shared User Query (+2 more)

### Community 49 - "Community 49"
Cohesion: 0.33
Nodes (6): HasPermission, Key Rules, 🔐 Permission System Pattern, Snippet: Centralized Permissions Checking, Snippet: Conditional Layout Wrapper component, canCreateProduct

### Community 50 - "Community 50"
Cohesion: 0.33
Nodes (4): Branch, InsertBranch, insertBranchSchema, selectBranchSchema

### Community 51 - "Payments Tables & Metrics UI"
Cohesion: 0.16
Nodes (14): PosProductCard(), PosProductCardProps, CATEGORIES, ProductCatalogProps, TotalProductsCard(), TotalProductsCardProps, Payment, PaymentStatus (+6 more)

### Community 52 - "Community 52"
Cohesion: 0.50
Nodes (3): InventoryStatusTable(), InventoryStatusTableProps, InventoryStatusItem

### Community 53 - "Community 53"
Cohesion: 0.67
Nodes (3): TransactionDetailsTable(), TransactionDetailsTableProps, SalesTransactionRowData

### Community 54 - "Community 54"
Cohesion: 0.50
Nodes (4): RootLayout(), Key Rules, 🎨 Layout & Provider Pattern, Snippet: Root Layout configuration

### Community 57 - "Community 57"
Cohesion: 0.50
Nodes (4): Key Rules, Snippet: CLI Seeder Script (updateCountryGroups), ⚙️ Task Script Pattern, updateCountryGroups

### Community 58 - "Community 58"
Cohesion: 0.50
Nodes (4): createCustomerPortalSession, Good Practice: Returning `void`, Handling Action State & Feedback, 📝 React Form Action Type-Safety

### Community 61 - "Community 61"
Cohesion: 0.50
Nodes (4): Key Rules, 🛡️ Middleware Pattern, Snippet: Route Authorization Middleware, middleware.ts

### Community 68 - "System Notifications Models"
Cohesion: 0.50
Nodes (3): Notification, NotificationCategory, NotificationSeverity

### Community 70 - "PostgreSQL Docker Services"
Cohesion: 0.67
Nodes (3): Adminer DB Client Service, PostgreSQL DB Service, Database Seeding & Reset

## Knowledge Gaps
- **316 isolated node(s):** `envPath`, `eslintConfig`, `config`, `metadata`, `demoProducts` (+311 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Auth & security` connect `Project System & Agent Rules` to `App Entry and Theme Config`, `Dashboard Sidebar Layouts`, `Community 30`?**
  _High betweenness centrality (0.141) - this node is a cross-community bridge._
- **Why does `useAuth()` connect `Dashboard Sidebar Layouts` to `Community 32`, `Notification Store Hooks`, `GCash POS Callback UI`, `GCash POS Callback Actions`, `Community 38`, `Shared Dashboard Settings Panel`, `Dashboard Analytics Charts`, `Product Hooks and Store State`, `Community 47`, `Pickups Dashboard Manager`, `Reservations Dashboard Manager`, `GCash & Cash POS Payments`, `Cart Zustand State Hook`, `Email Verification Backend Actions`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **What connects `envPath`, `eslintConfig`, `config` to the rest of the system?**
  _319 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Transaction Table Components` be split into smaller, more focused modules?**
  _Cohesion score 0.0907258064516129 - nodes in this community are weakly interconnected._
- **Should `Project System & Agent Rules` be split into smaller, more focused modules?**
  _Cohesion score 0.0467687074829932 - nodes in this community are weakly interconnected._
- **Should `Landing Page Branch Grids` be split into smaller, more focused modules?**
  _Cohesion score 0.11255411255411256 - nodes in this community are weakly interconnected._
- **Should `Dashboard Analytics Charts` be split into smaller, more focused modules?**
  _Cohesion score 0.06866002214839424 - nodes in this community are weakly interconnected._