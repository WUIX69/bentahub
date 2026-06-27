# Graph Report - .  (2026-06-28)

## Corpus Check
- 65 files · ~80,198 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 873 nodes · 1380 edges · 87 communities (71 shown, 16 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

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
- [[_COMMUNITY_Drizzle Schema Definition Snippets|Drizzle Schema Definition Snippets]]
- [[_COMMUNITY_Payment Details Tables|Payment Details Tables]]
- [[_COMMUNITY_Contributing and Onboarding Guide|Contributing and Onboarding Guide]]
- [[_COMMUNITY_System Notifications DB Schema|System Notifications DB Schema]]
- [[_COMMUNITY_User Authentication Context|User Authentication Context]]
- [[_COMMUNITY_Verify Reset Code UI|Verify Reset Code UI]]
- [[_COMMUNITY_General Readme Documentation|General Readme Documentation]]
- [[_COMMUNITY_Admin Notifications Feeds|Admin Notifications Feeds]]
- [[_COMMUNITY_Payments Tables & Metrics UI|Payments Tables & Metrics UI]]
- [[_COMMUNITY_Product Cards & Catalogs UI|Product Cards & Catalogs UI]]
- [[_COMMUNITY_Shared History Log Queries|Shared History Log Queries]]
- [[_COMMUNITY_DB Caching Query Patterns|DB Caching Query Patterns]]
- [[_COMMUNITY_Branch Stock KPI Cards|Branch Stock KPI Cards]]
- [[_COMMUNITY_Customer Notifications Feeds|Customer Notifications Feeds]]
- [[_COMMUNITY_Nodemailer Service Templates|Nodemailer Service Templates]]
- [[_COMMUNITY_Import Boundary Rules|Import Boundary Rules]]
- [[_COMMUNITY_Centralized Permissions Checking|Centralized Permissions Checking]]
- [[_COMMUNITY_Registration Form Components|Registration Form Components]]
- [[_COMMUNITY_React Form Action Handling|React Form Action Handling]]
- [[_COMMUNITY_Monitoring Metrics UI Components|Monitoring Metrics UI Components]]
- [[_COMMUNITY_Product Sidebars Related section|Product Sidebars Related section]]
- [[_COMMUNITY_Reservation Summary Cards|Reservation Summary Cards]]
- [[_COMMUNITY_Sales Filter Option Widgets|Sales Filter Option Widgets]]
- [[_COMMUNITY_Branch Inventory Table Component|Branch Inventory Table Component]]
- [[_COMMUNITY_Verify Email Form UI|Verify Email Form UI]]
- [[_COMMUNITY_System Notifications Models|System Notifications Models]]
- [[_COMMUNITY_Authentication Component Layout|Authentication Component Layout]]
- [[_COMMUNITY_PostgreSQL Docker Services|PostgreSQL Docker Services]]
- [[_COMMUNITY_API Route Patterns Specs|API Route Patterns Specs]]
- [[_COMMUNITY_Auth Middleware Routing Rules|Auth Middleware Routing Rules]]
- [[_COMMUNITY_CLI Utility Script Patterns|CLI Utility Script Patterns]]
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
9. `Key Rules` - 9 edges
10. `getStockStatus()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `🎨 Layout & Provider Pattern` --rationale_for--> `RootLayout()`  [EXTRACTED]
  docs/FEATURE-SLICED-DESIGN.md → src/app/layout.tsx
- `PostgreSQL DB Service` --shares_data_with--> `Database Seeding & Reset`  [INFERRED]
  docker-compose.yml → docs/RUNBOOK.md
- `EmployeeTopbar()` --calls--> `useAuth()`  [EXTRACTED]
  src/features/employee-dashboard/components/employee-topbar.tsx → src/hooks/useAuth.ts
- `SalesPage()` --calls--> `useAuth()`  [EXTRACTED]
  src/app/(dashboard)/admin/(management)/sales/page.tsx → src/hooks/useAuth.ts
- `AdminPage()` --calls--> `useAuth()`  [EXTRACTED]
  src/app/(dashboard)/admin/page.tsx → src/hooks/useAuth.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Authentication & Authorization Architecture** — components_auth_provider, hooks_useauth, src_proxy, lib_auth_utils, lib_auth_edge_utils [INFERRED 0.95]
- **Database Layer Configuration** — drizzle_schema, drizzle_db, drizzle_seed, drizzle_config [INFERRED 0.95]

## Communities (87 total, 16 thin omitted)

### Community 0 - "POS and Order Actions"
Cohesion: 0.06
Nodes (42): addToCart(), cancelOrder(), createOrder(), markAllNotificationsRead(), markNotificationRead(), MarkNotificationReadResult, removeCartItem(), updateCartItem() (+34 more)

### Community 1 - "Transaction Table Components"
Cohesion: 0.11
Nodes (16): EmployeeTransactionTable(), EmployeeTransactionTableProps, allTransactions, employeePayments, employeePickups, GetTransactionsParams, GetTransactionsResult, ReceiptModalProps (+8 more)

### Community 2 - "App Entry and Theme Config"
Cohesion: 0.11
Nodes (19): loginAction(), logoutAction(), verifySessionAction(), fontMono, fontSans, fontSerif, metadata, ThemeProvider() (+11 more)

### Community 3 - "Project System & Agent Rules"
Cohesion: 0.10
Nodes (22): Auth & Security Architecture, Graphify Instructions, Known Gotchas, Project Overview, Research Rules, Roles & Constraints, src/components/auth-provider.tsx, BentaHub Runbook (+14 more)

### Community 4 - "Dashboard Sidebar Layouts"
Cohesion: 0.14
Nodes (14): AdminLayout(), AdminSidebar(), AdminSidebarProps, AdminTopbar(), DashboardSidebar(), EmployeeSidebar(), EmployeeSidebarProps, NAV_ITEMS (+6 more)

### Community 5 - "Landing Page Branch Grids"
Cohesion: 0.11
Nodes (10): branches, BranchGrid(), CtaBanner(), Footer(), HeroSection(), Navbar(), ProductGrid(), products (+2 more)

### Community 6 - "Dashboard Analytics Charts"
Cohesion: 0.13
Nodes (12): HistoryMetrics(), InventoryFlowTrend(), KPICard(), KPICardProps, PaymentMetrics(), PickupMetrics(), ReservationFilters(), ReservationMetrics() (+4 more)

### Community 7 - "Relational DB Schemas"
Cohesion: 0.10
Nodes (18): CartItem, cartItems, cartItemsRelations, InsertCartItem, insertCartItemSchema, selectCartItemSchema, EmailVerificationCode, emailVerificationRelations (+10 more)

### Community 8 - "Sales Charts and Metrics"
Cohesion: 0.17
Nodes (13): SalesChart(), SalesChartProps, SalesMetrics(), SalesMetricsProps, TransactionDetailsTable(), TransactionDetailsTableProps, SalesPage(), AdminApiResponse (+5 more)

### Community 9 - "User Registration Flows"
Cohesion: 0.22
Nodes (13): registerUser(), resendVerificationCodeAction(), verifyEmailAction(), generateVerificationCode(), hashPassword(), hashVerificationCode(), forgotPasswordSchema, loginSchema (+5 more)

### Community 10 - "User CRUD Admin Modals"
Cohesion: 0.14
Nodes (10): AddUserModal(), AddUserModalProps, DeleteUserModal(), DeleteUserModalProps, EditUserModal(), EditUserModalProps, UserData, mockUsers (+2 more)

### Community 11 - "Inventory Monitoring Table"
Cohesion: 0.14
Nodes (13): InventoryStatusTable(), InventoryStatusTableProps, SystemAlerts(), SystemAlertsProps, formatCurrency(), getMonitoringData(), RawBranch, RawInventory (+5 more)

### Community 12 - "Product Detail View UI"
Cohesion: 0.17
Nodes (10): ProductActions(), ProductActionsProps, ProductBreadcrumb(), ProductBreadcrumbProps, ProductDetailsSection(), ProductDetailsSectionProps, ProductImageGallery(), ProductImageGalleryProps (+2 more)

### Community 13 - "DB Connection & Seeding Setup"
Cohesion: 0.17
Nodes (11): Schema & DB Configuration, envPath, client, Database, envPath, BRANCHES, envPath, generateId() (+3 more)

### Community 14 - "Pickup Order Confirm Modals"
Cohesion: 0.15
Nodes (12): ConfirmPickupModal(), ConfirmPickupModalProps, PickupItem, PickupOrder, PickupDetailsModal(), PickupDetailsModalProps, PickupItem, PickupOrder (+4 more)

### Community 15 - "Stock Summary Cards UI"
Cohesion: 0.23
Nodes (5): EmployeeKpiCards(), EmployeeKpiCardsProps, StockSummaryCards(), allProducts, getStockStatus()

### Community 16 - "Pickups Dashboard Manager"
Cohesion: 0.14
Nodes (9): mockPayments, mockPickups, PaymentItem, PickupItem, PickupsManager(), Tab, GetPickupsParams, GetPickupsResult (+1 more)

### Community 17 - "Reservations Dashboard Manager"
Cohesion: 0.14
Nodes (9): CustomerTab, mockReservations, ReservationData, ReservationsManager(), statusLabels, statusStyles, GetReservationsParams, GetReservationsResult (+1 more)

### Community 18 - "Branch Inventory & Product Schema"
Cohesion: 0.15
Nodes (12): MonitoringSummary, BranchInventory, branchInventoryRelations, InsertBranchInventory, insertBranchInventorySchema, selectBranchInventorySchema, InsertProduct, insertProductSchema (+4 more)

### Community 19 - "Payments and Pickups UI"
Cohesion: 0.13
Nodes (15): 1. Tech Stack, 2. User Workflows & Permission Loops, 3. System Rules & Constraints, 4. Backend & Auth Implementation, 5. Directory & FSD Guidelines, 👑 Admin Workflow (`src/app/(dashboard)/admin/`), BentaHub — Unified Developer Reference Manual, 🛑 Coding & Import Rules (+7 more)

### Community 20 - "User Authentication Forms"
Cohesion: 0.13
Nodes (14): InsertOrder, InsertOrderItem, insertOrderItemSchema, insertOrderSchema, Order, OrderItem, orderItems, orderItemsRelations (+6 more)

### Community 21 - "Stock Check Management Flow"
Cohesion: 0.20
Nodes (12): AdminPage(), computeTrend(), formatCurrency(), getAdminOverview(), getMonthRange(), MONTH_NAMES, RawBranch, RawInventory (+4 more)

### Community 22 - "GCash & Cash POS Payments"
Cohesion: 0.15
Nodes (8): mockPayments, PaymentItem, PaymentMethod, PaymentsManager(), PaymentStatus, GetPaymentsParams, GetPaymentsResult, PaymentRecord

### Community 23 - "Forgot Password UI Forms"
Cohesion: 0.14
Nodes (14): 1. Prerequisites, 2. Configure Environment Variables, 3. Install Dependencies, 4. Database Setup, 5. Run the Development Server, BentaHub — Centralized Inventory Management and POS System, Direct Docker Compose Commands, Docker Helper Scripts (+6 more)

### Community 24 - "Password Reset Backend Services"
Cohesion: 0.16
Nodes (11): Branch, branches, InsertBranch, insertBranchSchema, selectBranchSchema, InsertTransaction, insertTransactionSchema, selectTransactionSchema (+3 more)

### Community 25 - "Walk-in & Reservation Cart UI"
Cohesion: 0.18
Nodes (9): AddStockModal(), AddStockModalProps, CATEGORIES, ProductForm, EmployeeNotificationItem, EmployeeNotificationsFeed(), mockNotifications, LiveTransactionFeed() (+1 more)

### Community 26 - "Cart Zustand State Hook"
Cohesion: 0.18
Nodes (9): AlertItem, InventoryRow, LiveTransaction, mockAlerts, mockBranches, mockInventory, mockLiveTransactions, MonitoringDashboard() (+1 more)

### Community 27 - "Cart Items Local Storage Store"
Cohesion: 0.20
Nodes (3): AuthHeaderProps, CreateNewPasswordForm(), ForgotPasswordForm()

### Community 28 - "Database Transaction Schemas"
Cohesion: 0.30
Nodes (8): CartItem(), CartItemProps, CartSidebar(), CartSidebarProps, useCart(), UseCartReturn, EmployeePosPage(), CartItem

### Community 29 - "Email Verification Backend Actions"
Cohesion: 0.21
Nodes (5): FilterTab, NotificationItem, NotificationsFeed(), roleLabels, roleToBuilder

### Community 30 - "User Branches Relational Schema"
Cohesion: 0.25
Nodes (7): AdminTopbarProps, DashboardTopbar(), getInitials(), EmployeeTopbar(), EmployeeTopbarProps, ROUTE_TITLES, ThemeToggle()

### Community 31 - "Order Pickup Verification Modals"
Cohesion: 0.33
Nodes (7): DashboardSidebarProps, APP_NAME, BRANCHES, PAYMENT_METHODS, PaymentMethod, USER_ROLES, UserRole

### Community 32 - "Drizzle Migration Script & Utils"
Cohesion: 0.22
Nodes (6): CatalogPage(), demoProducts, CatalogToolbar(), CategorySidebar(), Pagination(), useProducts()

### Community 33 - "Notification Store Hooks"
Cohesion: 0.24
Nodes (8): DashboardMobileNav(), DashboardMobileNavProps, DashboardLayout(), getPageTitleAndSubtitle(), NavLink, NavSection, ROLE_NAV_ITEMS, ROLE_TITLES

### Community 34 - "GCash POS Callback UI"
Cohesion: 0.33
Nodes (5): InventoryUpdateTable(), InventoryUpdateTableProps, QuickStockModal(), QuickStockModalProps, Product

### Community 35 - "GCash POS Callback Actions"
Cohesion: 0.20
Nodes (4): customerOrders, employeeTransactions, MockTransaction, TransactionsList()

### Community 36 - "Notifications Center Popovers"
Cohesion: 0.25
Nodes (6): mockTransactions, Transaction, TransactionDetail, TransactionHistoryModal(), TransactionHistoryModalProps, TransactionItem

### Community 38 - "GCash POS Processing Schemas"
Cohesion: 0.25
Nodes (7): PaymentItem, PaymentPickupList(), PaymentPickupListProps, PickupItem, Tab, VerifyPickupModal(), VerifyPickupModalProps

### Community 39 - "Shared Dashboard Settings Panel"
Cohesion: 0.25
Nodes (3): SettingsPanel(), GetSettingsParams, SettingsData

### Community 40 - "Product Hooks and Store State"
Cohesion: 0.33
Nodes (6): getProductById(), getProducts(), ProductFilters, Product, ProductsState, useProductsStore

### Community 41 - "Sales Reporting Analytics Queries"
Cohesion: 0.25
Nodes (8): formatCurrency(), getSalesData(), MONTH_NAMES, SalesFilterOptions, SalesOverview, SalesPageData, SalesTransactionRow, SalesTrendPoint

### Community 42 - "FSD Architecture Guidelines"
Cohesion: 0.22
Nodes (9): Build-Time Bypass, 📂 Directory Structure Overview, 🔒 Environment Variable Validation, 🏗️ Feature-First Mini-Applications, Feature Sliced Design (FSD) Architecture Guidelines, Snippet: Form Zod Schemas with Transformations & Refinement, 📖 Table of Contents, 📈 The Rule of Promotion (+1 more)

### Community 43 - "Drizzle Schema Definition Snippets"
Cohesion: 0.25
Nodes (8): RootLayout(), 🏗️ Drizzle Schema Definition Patterns, 🧩 Feature Component Patterns, Key Rules, 🎨 Layout & Provider Pattern, Snippet: Root Layout configuration, Snippet: Schema and Relationships Definitions, Snippet: Standard Client Form Component

### Community 44 - "Payment Details Tables"
Cohesion: 0.29
Nodes (6): PaymentDetailsModal(), PaymentDetailsModalProps, PaymentRecord, mockPayments, PaymentRecord, PaymentTable()

### Community 45 - "Contributing and Onboarding Guide"
Cohesion: 0.25
Nodes (8): 💻 Available Development Commands, BentaHub Contributing Guide, Core Folder Structure, 🏗️ Feature-Sliced Design (FSD) Guidelines, 🛠️ Local Setup, 📝 Pull Request Checklist, The Isolation Principle, 🚦 Verification & Code Style

### Community 46 - "System Notifications DB Schema"
Cohesion: 0.25
Nodes (7): InsertNotification, insertNotificationSchema, Notification, notifications, notificationsRelations, notificationTypeEnum, selectNotificationSchema

### Community 47 - "User Authentication Context"
Cohesion: 0.29
Nodes (6): AuthContext, LoginPayload, LoginResponseData, Session, User, VerifyEmailPayload

### Community 48 - "Verify Reset Code UI"
Cohesion: 0.38
Nodes (3): verifyResetCode(), ResetPasswordForm(), verifyResetCodeSchema

### Community 50 - "Admin Notifications Feeds"
Cohesion: 0.29
Nodes (6): AdminNotificationsFeed(), badgeColorMap, borderColorMap, iconColorMap, mockNotifications, NotificationItem

### Community 52 - "Product Cards & Catalogs UI"
Cohesion: 0.33
Nodes (5): ProductCard(), ProductCardProps, CATEGORIES, ProductCatalog(), ProductCatalogProps

### Community 53 - "Shared History Log Queries"
Cohesion: 0.38
Nodes (3): getHistory(), HistoryRecord, transactions

### Community 54 - "DB Caching Query Patterns"
Cohesion: 0.33
Nodes (7): getProducts, getProductsInternal, 1. Caching Strategy & Public/Internal Split, 2. Cache Tagging Levels, 3. Mutations & Revalidation Pattern, ⚡ DB Caching & Query Patterns, dbCache

### Community 55 - "Branch Stock KPI Cards"
Cohesion: 0.40
Nodes (4): BranchStockItem, BranchStockOverview(), BranchStockOverviewProps, STATUS_COLORS

### Community 56 - "Customer Notifications Feeds"
Cohesion: 0.33
Nodes (4): CustomerNotificationItem, FilterTab, mockNotifications, tabs

### Community 57 - "Nodemailer Service Templates"
Cohesion: 0.60
Nodes (4): getVerificationEmailHtml(), getTransporter(), sendPasswordResetEmail(), sendVerificationEmail()

### Community 58 - "Import Boundary Rules"
Cohesion: 0.47
Nodes (6): Feature Sliced Design Architecture, Feature Sliced Design (FSD) Guidelines, 🛑 Import Boundary Rules, Rule of Promotion, ⚡ Server Action Patterns, Snippet: Standard Mutation Server Action

### Community 59 - "Centralized Permissions Checking"
Cohesion: 0.40
Nodes (5): HasPermission, 🔐 Permission System Pattern, Snippet: Centralized Permissions Checking, Snippet: Conditional Layout Wrapper component, canCreateProduct

### Community 61 - "React Form Action Handling"
Cohesion: 0.50
Nodes (4): createCustomerPortalSession, Good Practice: Returning `void`, Handling Action State & Feedback, 📝 React Form Action Type-Safety

### Community 62 - "Monitoring Metrics UI Components"
Cohesion: 0.67
Nodes (3): MonitoringMetrics(), MonitoringMetricsProps, MonitoringMetricsData

### Community 63 - "Product Sidebars Related section"
Cohesion: 0.50
Nodes (3): ProductSidebarSection(), ProductSidebarSectionProps, RelatedProduct

### Community 65 - "Sales Filter Option Widgets"
Cohesion: 0.50
Nodes (3): BranchOption, SalesFilters(), SalesFiltersProps

### Community 68 - "System Notifications Models"
Cohesion: 0.50
Nodes (3): Notification, NotificationCategory, NotificationSeverity

### Community 70 - "PostgreSQL Docker Services"
Cohesion: 0.67
Nodes (3): Adminer DB Client Service, PostgreSQL DB Service, Database Seeding & Reset

### Community 71 - "API Route Patterns Specs"
Cohesion: 0.67
Nodes (3): 🌐 API Route Patterns, Snippet: Cryptographic Webhook Handler (Clerk Webhook), Snippet: Edge API Route (discount banner script generator)

### Community 72 - "Auth Middleware Routing Rules"
Cohesion: 0.67
Nodes (3): 🛡️ Middleware Pattern, Snippet: Route Authorization Middleware, middleware.ts

### Community 73 - "CLI Utility Script Patterns"
Cohesion: 0.67
Nodes (3): Snippet: CLI Seeder Script (updateCountryGroups), ⚙️ Task Script Pattern, updateCountryGroups

## Knowledge Gaps
- **313 isolated node(s):** `envPath`, `eslintConfig`, `config`, `metadata`, `NavLink` (+308 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useAuth()` connect `Dashboard Sidebar Layouts` to `POS and Order Actions`, `Notification Store Hooks`, `GCash POS Callback Actions`, `Shared Dashboard Settings Panel`, `Sales Charts and Metrics`, `Pickups Dashboard Manager`, `Reservations Dashboard Manager`, `Stock Check Management Flow`, `GCash & Cash POS Payments`, `Cart Zustand State Hook`, `Email Verification Backend Actions`, `User Branches Relational Schema`, `Order Pickup Verification Modals`?**
  _High betweenness centrality (0.209) - this node is a cross-community bridge._
- **Why does `Auth & Security Architecture` connect `Project System & Agent Rules` to `POS and Order Actions`, `Nodemailer Service Templates`, `Dashboard Sidebar Layouts`?**
  _High betweenness centrality (0.163) - this node is a cross-community bridge._
- **Why does `db` connect `POS and Order Actions` to `App Entry and Theme Config`, `Product Hooks and Store State`, `User Registration Flows`, `Sales Reporting Analytics Queries`, `Inventory Monitoring Table`, `DB Connection & Seeding Setup`, `Verify Reset Code UI`, `Branch Inventory & Product Schema`, `Shared History Log Queries`, `Stock Check Management Flow`?**
  _High betweenness centrality (0.154) - this node is a cross-community bridge._
- **What connects `envPath`, `eslintConfig`, `config` to the rest of the system?**
  _316 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `POS and Order Actions` be split into smaller, more focused modules?**
  _Cohesion score 0.057971014492753624 - nodes in this community are weakly interconnected._
- **Should `Transaction Table Components` be split into smaller, more focused modules?**
  _Cohesion score 0.10541310541310542 - nodes in this community are weakly interconnected._
- **Should `App Entry and Theme Config` be split into smaller, more focused modules?**
  _Cohesion score 0.11076923076923077 - nodes in this community are weakly interconnected._