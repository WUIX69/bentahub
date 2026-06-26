# Graph Report - .  (2026-06-26)

## Corpus Check
- 1 files · ~89,452 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 842 nodes · 1358 edges · 68 communities (54 shown, 14 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.86)
- Token cost: 14,000 input · 4,000 output

## Community Hubs (Navigation)
- [[_COMMUNITY_User Registration & Verification|User Registration & Verification]]
- [[_COMMUNITY_Admin Monitoring & Data Overview|Admin Monitoring & Data Overview]]
- [[_COMMUNITY_Sidebar & Mobile Navigation UI|Sidebar & Mobile Navigation UI]]
- [[_COMMUNITY_Auth & Password Forms|Auth & Password Forms]]
- [[_COMMUNITY_FSD Architecture & App Docs|FSD Architecture & App Docs]]
- [[_COMMUNITY_Root Layout & Global CSS|Root Layout & Global CSS]]
- [[_COMMUNITY_Staff KPI & Stock Status|Staff KPI & Stock Status]]
- [[_COMMUNITY_Stock Management UI|Stock Management UI]]
- [[_COMMUNITY_Live Transaction Feed UI|Live Transaction Feed UI]]
- [[_COMMUNITY_Notification Feed & Read Actions|Notification Feed & Read Actions]]
- [[_COMMUNITY_Branch Grid & Footer Layout|Branch Grid & Footer Layout]]
- [[_COMMUNITY_Dashboard Metrics & Charts|Dashboard Metrics & Charts]]
- [[_COMMUNITY_Sales Data & Overview Retrieval|Sales Data & Overview Retrieval]]
- [[_COMMUNITY_Product Details & UI Actions|Product Details & UI Actions]]
- [[_COMMUNITY_Cart Sidebar UI Components|Cart Sidebar UI Components]]
- [[_COMMUNITY_Dashboard Monitoring Mock Data|Dashboard Monitoring Mock Data]]
- [[_COMMUNITY_Checkout & Cart Pages|Checkout & Cart Pages]]
- [[_COMMUNITY_Pickup Modal & Order Details|Pickup Modal & Order Details]]
- [[_COMMUNITY_Pickup & Payment Management|Pickup & Payment Management]]
- [[_COMMUNITY_Recent Orders & Transactions Tables|Recent Orders & Transactions Tables]]
- [[_COMMUNITY_Reservations Manager UI|Reservations Manager UI]]
- [[_COMMUNITY_Payment Summary & Tables|Payment Summary & Tables]]
- [[_COMMUNITY_Payments Manager Mock Data|Payments Manager Mock Data]]
- [[_COMMUNITY_Catalog Page & Sidebar|Catalog Page & Sidebar]]
- [[_COMMUNITY_Admin User Management Modals|Admin User Management Modals]]
- [[_COMMUNITY_Catalog Toolbar & Reservation Cards|Catalog Toolbar & Reservation Cards]]
- [[_COMMUNITY_Branch Inventory Schema|Branch Inventory Schema]]
- [[_COMMUNITY_Email Verification Schema|Email Verification Schema]]
- [[_COMMUNITY_Orders Schema & Types|Orders Schema & Types]]
- [[_COMMUNITY_Admin Stock Overview Panel|Admin Stock Overview Panel]]
- [[_COMMUNITY_Transaction History Lists|Transaction History Lists]]
- [[_COMMUNITY_Admin Dashboard Sidebar Layout|Admin Dashboard Sidebar Layout]]
- [[_COMMUNITY_Transaction Details Modals|Transaction Details Modals]]
- [[_COMMUNITY_System Settings & Configuration|System Settings & Configuration]]
- [[_COMMUNITY_Payment Table & Details Modals|Payment Table & Details Modals]]
- [[_COMMUNITY_Transactions Schema & Types|Transactions Schema & Types]]
- [[_COMMUNITY_Admin Notifications Feed|Admin Notifications Feed]]
- [[_COMMUNITY_Cart Items Schema|Cart Items Schema]]
- [[_COMMUNITY_Notifications Schema & Enums|Notifications Schema & Enums]]
- [[_COMMUNITY_App Constraints & Workflows|App Constraints & Workflows]]
- [[_COMMUNITY_Customer Notifications Feed|Customer Notifications Feed]]
- [[_COMMUNITY_Edge JWT Auth Utilities|Edge JWT Auth Utilities]]
- [[_COMMUNITY_Products Schema|Products Schema]]
- [[_COMMUNITY_Admin Users Page|Admin Users Page]]
- [[_COMMUNITY_Cashier Navigation Sidebar|Cashier Navigation Sidebar]]
- [[_COMMUNITY_Monitoring Metrics UI|Monitoring Metrics UI]]
- [[_COMMUNITY_Sales Trend Charts|Sales Trend Charts]]
- [[_COMMUNITY_Staff Navigation Sidebar|Staff Navigation Sidebar]]
- [[_COMMUNITY_Stock Tables|Stock Tables]]
- [[_COMMUNITY_Notification Types & Severity|Notification Types & Severity]]
- [[_COMMUNITY_Unwired Middleware Auth|Unwired Middleware Auth]]
- [[_COMMUNITY_Auth Layout Styling|Auth Layout Styling]]
- [[_COMMUNITY_Cashier Notifications Feed|Cashier Notifications Feed]]
- [[_COMMUNITY_Employee Topbar UI|Employee Topbar UI]]
- [[_COMMUNITY_Database Client & Seeding|Database Client & Seeding]]
- [[_COMMUNITY_Drizzle Kit Configuration|Drizzle Kit Configuration]]
- [[_COMMUNITY_ESLint Configuration|ESLint Configuration]]
- [[_COMMUNITY_PostCSS Configuration|PostCSS Configuration]]
- [[_COMMUNITY_BentaHub Tech Stack|BentaHub Tech Stack]]
- [[_COMMUNITY_Admin Workflow Rules|Admin Workflow Rules]]
- [[_COMMUNITY_FSD Isolation Rules|FSD Isolation Rules]]
- [[_COMMUNITY_Email Verification Code Table|Email Verification Code Table]]

## God Nodes (most connected - your core abstractions)
1. `useAuth()` - 25 edges
2. `db` - 24 edges
3. `verifyToken()` - 22 edges
4. `extractToken()` - 22 edges
5. `Feature Sliced Design (FSD) Guidelines` - 17 edges
6. `generateId()` - 16 edges
7. `Product` - 14 edges
8. `users` - 14 edges
9. `Transaction` - 11 edges
10. `hashVerificationCode()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Layout & Provider Pattern` --rationale_for--> `RootLayout()`  [EXTRACTED]
  docs/FEATURE-SLICED-DESIGN.md → src/app/layout.tsx
- `Branch Locking Constraint` --rationale_for--> `Employee Workflow`  [INFERRED]
  AGENTS.md → docs/BENTAHUB.md
- `Unwired Middleware Proxy` --conceptually_related_to--> `Authentication Mechanism`  [INFERRED]
  AGENTS.md → docs/BENTAHUB.md
- `Strict Payment Methods` --rationale_for--> `Customer Workflow`  [INFERRED]
  AGENTS.md → docs/BENTAHUB.md
- `Strict Payment Methods` --rationale_for--> `Employee Workflow`  [INFERRED]
  AGENTS.md → docs/BENTAHUB.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **FSD Core Architectural Principles** — docs_feature_sliced_design_architecture, docs_feature_sliced_design_rule_of_promotion, docs_feature_sliced_design_import_boundary_rules [EXTRACTED 1.00]
- **Permissions and Access Control Flow** — docs_feature_sliced_design_permission_system_pattern, lib_permissions_cancreateproduct, components_haspermission_haspermission [EXTRACTED 1.00]

## Communities (68 total, 14 thin omitted)

### Community 0 - "User Registration & Verification"
Cohesion: 0.07
Nodes (49): registerSchema, registerUser(), resendCodeSchema, resendVerificationCodeAction(), verifyEmailAction(), verifyEmailSchema, POST(), getVerificationEmailHtml() (+41 more)

### Community 1 - "Admin Monitoring & Data Overview"
Cohesion: 0.06
Nodes (51): formatCurrency(), getMonitoringData(), RawBranch, RawInventory, RawProduct, RawTransaction, computeTrend(), formatCurrency() (+43 more)

### Community 2 - "Sidebar & Mobile Navigation UI"
Cohesion: 0.06
Nodes (26): DashboardMobileNav(), DashboardMobileNavProps, DashboardSidebar(), DashboardSidebarProps, DashboardTopbar(), getInitials(), EmployeeSidebarProps, NAV_ITEMS (+18 more)

### Community 3 - "Auth & Password Forms"
Cohesion: 0.07
Nodes (20): AuthHeader(), AuthHeaderProps, CreateNewPasswordForm(), ForgotPasswordForm(), RegisterForm(), ResetPasswordForm(), VerifyEmailForm(), APP_NAME (+12 more)

### Community 4 - "FSD Architecture & App Docs"
Cohesion: 0.08
Nodes (23): createCustomerPortalSession, HasPermission, getProducts, getProductsInternal, API Route Patterns, Feature Sliced Design Architecture, DB Caching & Query Patterns, Feature Sliced Design (FSD) Guidelines (+15 more)

### Community 5 - "Root Layout & Global CSS"
Cohesion: 0.09
Nodes (13): fontMono, fontSans, fontSerif, metadata, RootLayout(), AuthContext, AuthContextValue, AuthProvider() (+5 more)

### Community 6 - "Staff KPI & Stock Status"
Cohesion: 0.16
Nodes (11): InventoryUpdateTableProps, QuickStockModalProps, StaffKpiCards(), StaffKpiCardsProps, StockSummaryCards(), StockTable(), allProducts, getStockStatus() (+3 more)

### Community 7 - "Stock Management UI"
Cohesion: 0.13
Nodes (16): AddStockModal(), AddStockModalProps, CATEGORIES, ProductForm, InventoryUpdateTable(), PaymentItem, PaymentPickupList(), PaymentPickupListProps (+8 more)

### Community 8 - "Live Transaction Feed UI"
Cohesion: 0.10
Nodes (12): LiveTransactionFeed(), LiveTransactionFeedProps, StaffTransactionTable(), StaffTransactionTableProps, allTransactions, staffPayments, staffPickups, GetTransactionsParams (+4 more)

### Community 9 - "Notification Feed & Read Actions"
Cohesion: 0.12
Nodes (10): MarkReadParams, MarkReadResult, FilterTab, NotificationItem, NotificationsFeed(), roleLabels, roleToBuilder, GetNotificationsParams (+2 more)

### Community 10 - "Branch Grid & Footer Layout"
Cohesion: 0.11
Nodes (10): branches, BranchGrid(), CtaBanner(), Footer(), HeroSection(), Navbar(), ProductGrid(), products (+2 more)

### Community 11 - "Dashboard Metrics & Charts"
Cohesion: 0.13
Nodes (12): HistoryMetrics(), InventoryFlowTrend(), PaymentMetrics(), PickupMetrics(), ReservationFilters(), ReservationMetrics(), mockReservations, Reservation (+4 more)

### Community 12 - "Sales Data & Overview Retrieval"
Cohesion: 0.13
Nodes (14): formatCurrency(), getSalesData(), MONTH_NAMES, SalesFilterOptions, SalesOverview, SalesPageData, SalesTransactionRow, SalesTrendPoint (+6 more)

### Community 13 - "Product Details & UI Actions"
Cohesion: 0.13
Nodes (13): ProductActions(), ProductActionsProps, ProductBreadcrumb(), ProductBreadcrumbProps, ProductDetailsSection(), ProductDetailsSectionProps, ProductImageGallery(), ProductImageGalleryProps (+5 more)

### Community 14 - "Cart Sidebar UI Components"
Cohesion: 0.21
Nodes (11): CartItem(), CartItemProps, CartSidebar(), CartSidebarProps, CATEGORIES, ProductCatalog(), ProductCatalogProps, useCart() (+3 more)

### Community 15 - "Dashboard Monitoring Mock Data"
Cohesion: 0.16
Nodes (11): AlertItem, InventoryRow, LiveTransaction, mockAlerts, mockBranches, mockInventory, mockLiveTransactions, MonitoringDashboard() (+3 more)

### Community 16 - "Checkout & Cart Pages"
Cohesion: 0.19
Nodes (8): CartPage(), CheckoutPage(), useCart(), ProductDetailPage(), ProductCardProps, CartItem, CartState, useCartStore

### Community 17 - "Pickup Modal & Order Details"
Cohesion: 0.15
Nodes (12): ConfirmPickupModal(), ConfirmPickupModalProps, PickupItem, PickupOrder, PickupDetailsModal(), PickupDetailsModalProps, PickupItem, PickupOrder (+4 more)

### Community 18 - "Pickup & Payment Management"
Cohesion: 0.14
Nodes (9): mockPayments, mockPickups, PaymentItem, PickupItem, PickupsManager(), Tab, GetPickupsParams, GetPickupsResult (+1 more)

### Community 19 - "Recent Orders & Transactions Tables"
Cohesion: 0.18
Nodes (10): demoOrders, RecentOrdersTable(), TransactionTable(), ApiOrder, ApiOrderItem, useOrders(), Order, OrderItem (+2 more)

### Community 20 - "Reservations Manager UI"
Cohesion: 0.14
Nodes (9): CustomerTab, mockReservations, ReservationData, ReservationsManager(), statusLabels, statusStyles, GetReservationsParams, GetReservationsResult (+1 more)

### Community 21 - "Payment Summary & Tables"
Cohesion: 0.18
Nodes (8): payments, Payment, PaymentStatus, PRODUCT_CATEGORIES, ProductCategory, StockStatus, TransactionItem, TransactionStatus

### Community 22 - "Payments Manager Mock Data"
Cohesion: 0.15
Nodes (8): mockPayments, PaymentItem, PaymentMethod, PaymentsManager(), PaymentStatus, GetPaymentsParams, GetPaymentsResult, PaymentRecord

### Community 23 - "Catalog Page & Sidebar"
Cohesion: 0.19
Nodes (8): CatalogPage(), demoProducts, CategorySidebar(), Pagination(), useProducts(), Product, ProductsState, useProductsStore

### Community 24 - "Admin User Management Modals"
Cohesion: 0.18
Nodes (9): AddUserModal(), AddUserModalProps, DeleteUserModal(), DeleteUserModalProps, EditUserModal(), EditUserModalProps, UserData, mockUsers (+1 more)

### Community 25 - "Catalog Toolbar & Reservation Cards"
Cohesion: 0.15
Nodes (4): CatalogToolbar(), ReservationCardProps, ReservationData, SummaryCards()

### Community 26 - "Branch Inventory Schema"
Cohesion: 0.20
Nodes (9): branchInventoryRelations, InsertBranchInventory, insertBranchInventorySchema, selectBranchInventorySchema, Branch, branches, InsertBranch, insertBranchSchema (+1 more)

### Community 27 - "Email Verification Schema"
Cohesion: 0.17
Nodes (10): EmailVerificationCode, emailVerificationRelations, InsertEmailVerificationCode, insertEmailVerificationSchema, selectEmailVerificationSchema, InsertUser, insertUserSchema, selectUserSchema (+2 more)

### Community 28 - "Orders Schema & Types"
Cohesion: 0.17
Nodes (11): InsertOrder, InsertOrderItem, insertOrderItemSchema, insertOrderSchema, Order, OrderItem, orderItemsRelations, ordersRelations (+3 more)

### Community 29 - "Admin Stock Overview Panel"
Cohesion: 0.22
Nodes (6): BranchStockItem, BranchStockOverview(), BranchStockOverviewProps, STATUS_COLORS, KPICard(), KPICardProps

### Community 30 - "Transaction History Lists"
Cohesion: 0.20
Nodes (4): customerOrders, employeeTransactions, MockTransaction, TransactionsList()

### Community 31 - "Admin Dashboard Sidebar Layout"
Cohesion: 0.22
Nodes (4): AdminSidebar(), AdminSidebarProps, AdminTopbar(), AdminTopbarProps

### Community 32 - "Transaction Details Modals"
Cohesion: 0.25
Nodes (6): mockTransactions, Transaction, TransactionDetail, TransactionHistoryModal(), TransactionHistoryModalProps, TransactionItem

### Community 33 - "System Settings & Configuration"
Cohesion: 0.25
Nodes (3): SettingsPanel(), GetSettingsParams, SettingsData

### Community 34 - "Payment Table & Details Modals"
Cohesion: 0.29
Nodes (6): PaymentDetailsModal(), PaymentDetailsModalProps, PaymentRecord, mockPayments, PaymentRecord, PaymentTable()

### Community 35 - "Transactions Schema & Types"
Cohesion: 0.25
Nodes (7): paymentMethodEnum, InsertTransaction, insertTransactionSchema, selectTransactionSchema, Transaction, transactionRelations, transactionStatusEnum

### Community 36 - "Admin Notifications Feed"
Cohesion: 0.29
Nodes (6): AdminNotificationsFeed(), badgeColorMap, borderColorMap, iconColorMap, mockNotifications, NotificationItem

### Community 37 - "Cart Items Schema"
Cohesion: 0.29
Nodes (6): CartItem, cartItems, cartItemsRelations, InsertCartItem, insertCartItemSchema, selectCartItemSchema

### Community 38 - "Notifications Schema & Enums"
Cohesion: 0.29
Nodes (6): InsertNotification, insertNotificationSchema, Notification, notificationsRelations, notificationTypeEnum, selectNotificationSchema

### Community 39 - "App Constraints & Workflows"
Cohesion: 0.33
Nodes (6): Branch Locking Constraint, No Delivery Architecture, Strict Payment Methods, User Roles, Customer Workflow, Employee Workflow

### Community 40 - "Customer Notifications Feed"
Cohesion: 0.33
Nodes (4): CustomerNotificationItem, FilterTab, mockNotifications, tabs

### Community 41 - "Edge JWT Auth Utilities"
Cohesion: 0.53
Nodes (4): base64urlToBytes(), verifyJwtEdge(), proxy(), PUBLIC_ROUTES

### Community 42 - "Products Schema"
Cohesion: 0.33
Nodes (5): InsertProduct, insertProductSchema, Product, productStockStatusEnum, selectProductSchema

### Community 45 - "Monitoring Metrics UI"
Cohesion: 0.67
Nodes (3): MonitoringMetrics(), MonitoringMetricsProps, MonitoringMetricsData

### Community 46 - "Sales Trend Charts"
Cohesion: 0.67
Nodes (3): SalesChart(), SalesChartProps, SalesTrendPointData

### Community 49 - "Notification Types & Severity"
Cohesion: 0.50
Nodes (3): Notification, NotificationCategory, NotificationSeverity

### Community 50 - "Unwired Middleware Auth"
Cohesion: 0.67
Nodes (3): Unwired Middleware Proxy, Authentication Mechanism, Email Verification Flow

### Community 54 - "Database Client & Seeding"
Cohesion: 0.67
Nodes (3): Adminer DB Client Service, PostgreSQL DB Service, Database Seeding & Reset

## Knowledge Gaps
- **268 isolated node(s):** `eslintConfig`, `config`, `metadata`, `metadata`, `fontSans` (+263 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useAuth()` connect `Sidebar & Mobile Navigation UI` to `System Settings & Configuration`, `Notification Feed & Read Actions`, `Sales Data & Overview Retrieval`, `Dashboard Monitoring Mock Data`, `Checkout & Cart Pages`, `Pickup & Payment Management`, `Recent Orders & Transactions Tables`, `Reservations Manager UI`, `Payments Manager Mock Data`, `Transaction History Lists`, `Admin Dashboard Sidebar Layout`?**
  _High betweenness centrality (0.494) - this node is a cross-community bridge._
- **Why does `Transaction` connect `Live Transaction Feed UI` to `Payment Summary & Tables`, `Transaction History Lists`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Why does `db` connect `User Registration & Verification` to `Admin Monitoring & Data Overview`, `Sales Data & Overview Retrieval`, `Dashboard Monitoring Mock Data`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `verifyToken()` (e.g. with `PATCH()` and `GET()`) actually correct?**
  _`verifyToken()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `extractToken()` (e.g. with `PATCH()` and `GET()`) actually correct?**
  _`extractToken()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `eslintConfig`, `config`, `metadata` to the rest of the system?**
  _276 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `User Registration & Verification` be split into smaller, more focused modules?**
  _Cohesion score 0.07330618289522399 - nodes in this community are weakly interconnected._