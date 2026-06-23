# Graph Report - bentahub  (2026-06-23)

## Corpus Check
- 242 files · ~79,520 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 902 nodes · 1458 edges · 83 communities (68 shown, 15 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f37ac5fb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

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
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 81|Community 81]]
- [[_COMMUNITY_Community 82|Community 82]]

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

## Communities (83 total, 15 thin omitted)

### Community 0 - "User Registration & Verification"
Cohesion: 0.17
Nodes (12): GET(), getUserIdFromToken(), POST(), client, Database, db, POST(), RouteParams (+4 more)

### Community 1 - "System & Branch Monitoring"
Cohesion: 0.14
Nodes (14): formatCurrency(), getMonitoringData(), RawBranch, RawInventory, RawProduct, RawTransaction, InventoryStatusTable(), InventoryStatusTableProps (+6 more)

### Community 2 - "Root Layout & Typography"
Cohesion: 0.10
Nodes (12): fontMono, fontSans, fontSerif, metadata, AuthContext, AuthContextValue, AuthProvider(), AuthProviderProps (+4 more)

### Community 3 - "Cart API Routes"
Cohesion: 0.19
Nodes (17): DELETE(), getUserIdFromToken(), PUT(), extractToken(), verifyToken(), getUserIdFromToken(), PATCH(), getUserIdFromToken() (+9 more)

### Community 4 - "Landing Grid & Sidebar"
Cohesion: 0.08
Nodes (18): AuthHeaderProps, branches, BranchGrid(), CtaBanner(), DashboardSidebar(), DashboardSidebarProps, Footer(), HeroSection() (+10 more)

### Community 5 - "Product Catalog Toolbar & Actions"
Cohesion: 0.13
Nodes (13): ProductActions(), ProductActionsProps, ProductBreadcrumb(), ProductBreadcrumbProps, ProductDetailsSection(), ProductDetailsSectionProps, ProductImageGallery(), ProductImageGalleryProps (+5 more)

### Community 6 - "Email Verification Schema"
Cohesion: 0.11
Nodes (17): CartItem, cartItemsRelations, InsertCartItem, insertCartItemSchema, selectCartItemSchema, InsertNotification, insertNotificationSchema, Notification (+9 more)

### Community 7 - "Inventory Flow & KPI Metrics"
Cohesion: 0.17
Nodes (9): HistoryMetrics(), InventoryFlowTrend(), PaymentMetrics(), PickupMetrics(), ReservationFilters(), ReservationMetrics(), BranchOption, SalesFilters() (+1 more)

### Community 8 - "Cashier Shopping Cart"
Cohesion: 0.21
Nodes (11): CashierPage(), CartItem(), CartItemProps, CartSidebar(), CartSidebarProps, CATEGORIES, ProductCatalog(), ProductCatalogProps (+3 more)

### Community 9 - "Customer Dashboard Navigation & Header"
Cohesion: 0.40
Nodes (5): DashboardTopbar(), getInitials(), CustomerLayout(), CustomerPage(), useAuth()

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
Cohesion: 0.20
Nodes (7): HistoryTable(), mockTransactions, Transaction, TransactionDetail, TransactionHistoryModal(), TransactionHistoryModalProps, TransactionItem

### Community 21 - "Customer Orders & History"
Cohesion: 0.24
Nodes (8): RecentOrdersTable(), TransactionTable(), useOrders(), ReservationsPage(), Order, OrderItem, OrdersState, useOrdersStore

### Community 22 - "Customer Catalog Sidebar & Pagination"
Cohesion: 0.31
Nodes (6): CatalogPage(), Pagination(), useProducts(), Product, ProductsState, useProductsStore

### Community 23 - "Customer Reservation Summary"
Cohesion: 0.38
Nodes (4): ReservationCard(), ReservationCardProps, ReservationData, ReservationSummary()

### Community 24 - "Branch Inventory Schema"
Cohesion: 0.05
Nodes (42): BranchInventory, branchInventoryRelations, InsertBranchInventory, insertBranchInventorySchema, selectBranchInventorySchema, Branch, branches, InsertBranch (+34 more)

### Community 25 - "Orders Schema"
Cohesion: 0.05
Nodes (39): 1. Local Setup, 2. Feature Development (FSD Rules), 3. Version Control & Git Workflow, Admin Workflow (`app/admin/`), 🏗️ Architecture: Feature-Sliced Design (FSD), BENTAHUB: Centralized Inventory Management and POS System, Branch Naming, Cashier Workflow (`app/cashier/`) (+31 more)

### Community 26 - "Admin Overview Analytics"
Cohesion: 0.17
Nodes (14): computeTrend(), formatCurrency(), getAdminOverview(), getMonthRange(), MONTH_NAMES, RawBranch, RawInventory, RawTransaction (+6 more)

### Community 27 - "Admin Reservations & Users Panel"
Cohesion: 0.20
Nodes (4): PickupTable(), mockReservations, Reservation, ReservationTable()

### Community 28 - "Admin Payment History Modals"
Cohesion: 0.22
Nodes (6): PaymentDetailsModal(), PaymentDetailsModalProps, PaymentRecord, mockPayments, PaymentRecord, PaymentTable()

### Community 29 - "Admin Sales Analytics Actions"
Cohesion: 0.21
Nodes (10): formatCurrency(), getSalesData(), MONTH_NAMES, SalesFilterOptions, SalesOverview, SalesPageData, SalesTransactionRow, SalesTrendPoint (+2 more)

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
Cohesion: 0.06
Nodes (31): 10. **Dashboard Summary Cards** 🟢 LOW, 1. **Database Has No Products** 🔴 CRITICAL, 2. **Product Detail Page Not Wired** 🔴 CRITICAL, 3. **Order Items Not Returned** 🔴 CRITICAL, 4. **No Pickup Date/Time Selection** 🟡 MEDIUM, 5. **Product Search & Filtering** 🟡 MEDIUM, 6. **No Real Payment Processing** 🟡 MEDIUM, 7. **Notifications System Incomplete** 🟡 MEDIUM (+23 more)

### Community 36 - "Admin Database Seeding"
Cohesion: 0.07
Nodes (29): 1. Prerequisites, 2. Environment Variables, 3. Install Dependencies, 4. Database Setup, 5. Start Development Server, API Routes, Authentication, Backend Setup Documentation (+21 more)

### Community 37 - "Authentication & Setup Documentation"
Cohesion: 0.04
Nodes (47): Database Schema, Email Verification Codes Table, Backend Setup Instructions, Users Table, Email Verification Codes Table Schema, 1. **Database Schema** (Drizzle ORM + PostgreSQL), 1. Install Dependencies, 2. **Authentication & Security** (+39 more)

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
Cohesion: 0.21
Nodes (16): registerSchema, registerUser(), getVerificationEmailHtml(), generateVerificationCode(), hashPassword(), hashVerificationCode(), getTransporter(), sendPasswordResetEmail() (+8 more)

### Community 43 - "Admin Pickups & Metrics"
Cohesion: 0.16
Nodes (5): AuthHeader(), CreateNewPasswordForm(), ForgotPasswordForm(), ResetPasswordForm(), VerifyEmailForm()

### Community 45 - "Docker Configuration & Setup"
Cohesion: 0.17
Nodes (11): Next.js App Service (Docker), Postgres Database Service (Docker), Adding components, Docker Support, Getting Started, 🚀 Local Development Setup, Next.js template, Prerequisites (+3 more)

### Community 46 - "Notifications Types"
Cohesion: 0.50
Nodes (3): Notification, NotificationCategory, NotificationSeverity

### Community 71 - "Community 71"
Cohesion: 0.16
Nodes (9): BranchStockItem, BranchStockOverview(), BranchStockOverviewProps, STATUS_COLORS, KPICard(), KPICardProps, SalesChart(), SalesChartProps (+1 more)

### Community 72 - "Community 72"
Cohesion: 0.22
Nodes (8): RegisterForm(), UserRole, AuthContext, LoginPayload, RegisterPayload, Session, User, VerifyEmailPayload

### Community 73 - "Community 73"
Cohesion: 0.17
Nodes (6): CatalogToolbar(), CategorySidebar(), DashboardMobileNav(), DashboardMobileNavProps, NearbyBranches(), SummaryCards()

### Community 74 - "Community 74"
Cohesion: 0.33
Nodes (6): generateToken(), JWT_SECRET, TokenPayload, verifyPassword(), POST(), LoginResponseData

### Community 75 - "Community 75"
Cohesion: 0.29
Nodes (6): EmailVerificationCode, emailVerificationRelations, emailVerifications, InsertEmailVerificationCode, insertEmailVerificationSchema, selectEmailVerificationSchema

### Community 76 - "Community 76"
Cohesion: 0.47
Nodes (4): resendCodeSchema, resendVerificationCodeAction(), verifyEmailAction(), verifyEmailSchema

### Community 78 - "Community 78"
Cohesion: 0.67
Nodes (3): MonitoringMetrics(), MonitoringMetricsProps, MonitoringMetricsData

### Community 79 - "Community 79"
Cohesion: 0.67
Nodes (3): SalesMetrics(), SalesMetricsProps, SalesOverviewData

### Community 80 - "Community 80"
Cohesion: 0.67
Nodes (3): TransactionDetailsTable(), TransactionDetailsTableProps, SalesTransactionRowData

## Knowledge Gaps
- **312 isolated node(s):** `eslintConfig`, `config`, `pool`, `pool`, `pool` (+307 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ThemeToggle()` connect `Dashboard Sidebars & Topbar` to `Customer Dashboard Navigation & Header`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **Why does `useAuth()` connect `Customer Dashboard Navigation & Header` to `Customer Checkout & Cart Store`, `Customer Orders & History`, `Notifications Hook & Zustand Store`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `AuthHeader()` connect `Admin Pickups & Metrics` to `Community 72`, `Root Layout & Typography`, `Landing Grid & Sidebar`, `Community 76`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `verifyToken()` (e.g. with `PATCH()` and `GET()`) actually correct?**
  _`verifyToken()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `extractToken()` (e.g. with `PATCH()` and `GET()`) actually correct?**
  _`extractToken()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `eslintConfig`, `config`, `pool` to the rest of the system?**
  _314 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `System & Branch Monitoring` be split into smaller, more focused modules?**
  _Cohesion score 0.1380952380952381 - nodes in this community are weakly interconnected._