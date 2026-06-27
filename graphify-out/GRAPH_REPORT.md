# Graph Report - bentahub  (2026-06-27)

## Corpus Check
- 245 files · ~80,517 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 902 nodes · 1458 edges · 90 communities (76 shown, 14 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f335a4e7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

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
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Database Client & Seeding|Database Client & Seeding]]
- [[_COMMUNITY_Drizzle Kit Configuration|Drizzle Kit Configuration]]
- [[_COMMUNITY_ESLint Configuration|ESLint Configuration]]
- [[_COMMUNITY_API Post Route Handlers|API Post Route Handlers]]
- [[_COMMUNITY_PostCSS Configuration|PostCSS Configuration]]
- [[_COMMUNITY_BentaHub Tech Stack|BentaHub Tech Stack]]
- [[_COMMUNITY_Admin Workflow Rules|Admin Workflow Rules]]
- [[_COMMUNITY_FSD Isolation Rules|FSD Isolation Rules]]
- [[_COMMUNITY_Email Verification Code Table|Email Verification Code Table]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
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
- [[_COMMUNITY_Community 83|Community 83]]
- [[_COMMUNITY_Community 84|Community 84]]
- [[_COMMUNITY_Community 85|Community 85]]
- [[_COMMUNITY_Community 86|Community 86]]
- [[_COMMUNITY_Community 88|Community 88]]
- [[_COMMUNITY_Community 89|Community 89]]
- [[_COMMUNITY_Community 90|Community 90]]

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
- `Branch Locking Constraint` --rationale_for--> `Employee Workflow`  [INFERRED]
  AGENTS.md → docs/BENTAHUB.md
- `Unwired Middleware Proxy` --conceptually_related_to--> `Authentication Mechanism`  [INFERRED]
  AGENTS.md → docs/BENTAHUB.md
- `Strict Payment Methods` --rationale_for--> `Customer Workflow`  [INFERRED]
  AGENTS.md → docs/BENTAHUB.md
- `Strict Payment Methods` --rationale_for--> `Employee Workflow`  [INFERRED]
  AGENTS.md → docs/BENTAHUB.md

## Import Cycles
- 1-file cycle: `src/server/actions/add-to-cart.ts -> src/server/actions/add-to-cart.ts`
- 1-file cycle: `src/server/actions/remove-cart-item.ts -> src/server/actions/remove-cart-item.ts`
- 1-file cycle: `src/server/actions/update-cart-item.ts -> src/server/actions/update-cart-item.ts`
- 1-file cycle: `src/server/db/get-cart.ts -> src/server/db/get-cart.ts`
- 1-file cycle: `src/server/actions/cancel-order.ts -> src/server/actions/cancel-order.ts`
- 1-file cycle: `src/server/actions/create-order.ts -> src/server/actions/create-order.ts`
- 1-file cycle: `src/server/db/get-orders.ts -> src/server/db/get-orders.ts`
- 1-file cycle: `src/server/actions/auth.ts -> src/server/actions/auth.ts`

## Hyperedges (group relationships)
- **FSD Core Architectural Principles** — docs_feature_sliced_design_architecture, docs_feature_sliced_design_rule_of_promotion, docs_feature_sliced_design_import_boundary_rules [EXTRACTED 1.00]
- **Permissions and Access Control Flow** — docs_feature_sliced_design_permission_system_pattern, lib_permissions_cancreateproduct, components_haspermission_haspermission [EXTRACTED 1.00]

## Communities (90 total, 14 thin omitted)

### Community 0 - "User Registration & Verification"
Cohesion: 0.17
Nodes (11): client, Database, db, envPath, cartItems, orders, addToCartSchema, removeCartItemSchema (+3 more)

### Community 1 - "Admin Monitoring & Data Overview"
Cohesion: 0.17
Nodes (13): MonitoringMetrics(), MonitoringMetricsProps, SalesMetrics(), SalesMetricsProps, TransactionDetailsTable(), TransactionDetailsTableProps, SalesPage(), AdminApiResponse (+5 more)

### Community 2 - "Sidebar & Mobile Navigation UI"
Cohesion: 0.18
Nodes (12): AdminLayout(), AdminSidebar(), AdminSidebarProps, AdminTopbar(), DashboardSidebar(), EmployeeSidebar(), EmployeeSidebarProps, NAV_ITEMS (+4 more)

### Community 3 - "Auth & Password Forms"
Cohesion: 0.08
Nodes (23): App structure, Architecture & FSD rules, Auth & security, Commands, graphify, Known gotchas, Project overview, Research (+15 more)

### Community 4 - "FSD Architecture & App Docs"
Cohesion: 0.36
Nodes (5): Environment Variables Reference, Feature Sliced Design Architecture, Feature Sliced Design (FSD) Guidelines, 🛑 Import Boundary Rules, Rule of Promotion

### Community 5 - "Root Layout & Global CSS"
Cohesion: 0.14
Nodes (12): fontMono, fontSans, fontSerif, metadata, ThemeProvider(), AuthContext, AuthContextValue, AuthProvider() (+4 more)

### Community 6 - "Staff KPI & Stock Status"
Cohesion: 0.16
Nodes (10): EmployeeKpiCards(), EmployeeKpiCardsProps, InventoryUpdateTableProps, QuickStockModalProps, StockSummaryCards(), allProducts, getStockStatus(), ProductCard() (+2 more)

### Community 7 - "Stock Management UI"
Cohesion: 0.13
Nodes (16): AddStockModal(), AddStockModalProps, CATEGORIES, ProductForm, EmployeeNotificationItem, EmployeeNotificationsFeed(), mockNotifications, InventoryUpdateTable() (+8 more)

### Community 8 - "Live Transaction Feed UI"
Cohesion: 0.10
Nodes (18): EmployeeTransactionTable(), EmployeeTransactionTableProps, LiveTransactionFeed(), LiveTransactionFeedProps, allTransactions, employeePayments, employeePickups, GetTransactionsParams (+10 more)

### Community 9 - "Notification Feed & Read Actions"
Cohesion: 0.21
Nodes (5): FilterTab, NotificationItem, NotificationsFeed(), roleLabels, roleToBuilder

### Community 10 - "Branch Grid & Footer Layout"
Cohesion: 0.08
Nodes (18): AuthHeaderProps, branches, BranchGrid(), CtaBanner(), DashboardSidebarProps, Footer(), HeroSection(), Navbar() (+10 more)

### Community 11 - "Dashboard Metrics & Charts"
Cohesion: 0.12
Nodes (14): HistoryMetrics(), InventoryFlowTrend(), KPICard(), KPICardProps, PaymentMetrics(), PickupMetrics(), ReservationFilters(), ReservationMetrics() (+6 more)

### Community 12 - "Sales Data & Overview Retrieval"
Cohesion: 0.14
Nodes (16): AdminPage(), BranchStockItem, BranchStockOverview(), BranchStockOverviewProps, STATUS_COLORS, computeTrend(), formatCurrency(), getAdminOverview() (+8 more)

### Community 13 - "Product Details & UI Actions"
Cohesion: 0.13
Nodes (13): ProductActions(), ProductActionsProps, ProductBreadcrumb(), ProductBreadcrumbProps, ProductDetailsSection(), ProductDetailsSectionProps, ProductImageGallery(), ProductImageGalleryProps (+5 more)

### Community 14 - "Cart Sidebar UI Components"
Cohesion: 0.21
Nodes (11): CartItem(), CartItemProps, CartSidebar(), CartSidebarProps, CATEGORIES, ProductCatalog(), ProductCatalogProps, useCart() (+3 more)

### Community 15 - "Dashboard Monitoring Mock Data"
Cohesion: 0.18
Nodes (9): AlertItem, InventoryRow, LiveTransaction, mockAlerts, mockBranches, mockInventory, mockLiveTransactions, MonitoringDashboard() (+1 more)

### Community 16 - "Checkout & Cart Pages"
Cohesion: 0.26
Nodes (7): CartPage(), useCart(), ProductDetailPage(), ProductCardProps, CartItem, CartState, useCartStore

### Community 17 - "Pickup Modal & Order Details"
Cohesion: 0.15
Nodes (12): ConfirmPickupModal(), ConfirmPickupModalProps, PickupItem, PickupOrder, PickupDetailsModal(), PickupDetailsModalProps, PickupItem, PickupOrder (+4 more)

### Community 18 - "Pickup & Payment Management"
Cohesion: 0.14
Nodes (9): mockPayments, mockPickups, PaymentItem, PickupItem, PickupsManager(), Tab, GetPickupsParams, GetPickupsResult (+1 more)

### Community 19 - "Recent Orders & Transactions Tables"
Cohesion: 0.24
Nodes (9): CheckoutPage(), demoOrders, RecentOrdersTable(), TransactionTable(), useOrders(), Order, OrderItem, OrdersState (+1 more)

### Community 20 - "Reservations Manager UI"
Cohesion: 0.14
Nodes (9): CustomerTab, mockReservations, ReservationData, ReservationsManager(), statusLabels, statusStyles, GetReservationsParams, GetReservationsResult (+1 more)

### Community 22 - "Payments Manager Mock Data"
Cohesion: 0.15
Nodes (8): mockPayments, PaymentItem, PaymentMethod, PaymentsManager(), PaymentStatus, GetPaymentsParams, GetPaymentsResult, PaymentRecord

### Community 23 - "Catalog Page & Sidebar"
Cohesion: 0.18
Nodes (11): CatalogPage(), demoProducts, CatalogToolbar(), getProductById(), getProducts(), ProductFilters, useProducts(), products (+3 more)

### Community 24 - "Admin User Management Modals"
Cohesion: 0.19
Nodes (9): AddUserModal(), AddUserModalProps, DeleteUserModal(), DeleteUserModalProps, EditUserModal(), EditUserModalProps, UserData, mockUsers (+1 more)

### Community 25 - "Catalog Toolbar & Reservation Cards"
Cohesion: 0.11
Nodes (8): CategorySidebar(), CustomerNotificationItem, FilterTab, mockNotifications, tabs, NearbyBranches(), Pagination(), SummaryCards()

### Community 26 - "Branch Inventory Schema"
Cohesion: 0.33
Nodes (5): InsertProduct, insertProductSchema, Product, productStockStatusEnum, selectProductSchema

### Community 27 - "Email Verification Schema"
Cohesion: 0.13
Nodes (7): AuthHeader(), CreateNewPasswordForm(), ForgotPasswordForm(), RegisterForm(), ResetPasswordForm(), VerifyEmailForm(), RegisterPayload

### Community 28 - "Orders Schema & Types"
Cohesion: 0.15
Nodes (12): InsertOrder, InsertOrderItem, insertOrderItemSchema, insertOrderSchema, Order, OrderItem, orderItems, orderItemsRelations (+4 more)

### Community 29 - "Admin Stock Overview Panel"
Cohesion: 0.12
Nodes (15): 1. Tech Stack, 2. User Workflows & Permission Loops, 3. System Rules & Constraints, 4. Backend & Auth Implementation, 5. Directory & FSD Guidelines, 👑 Admin Workflow (`src/app/(dashboard)/admin/`), BentaHub — Unified Developer Reference Manual, 🛑 Coding & Import Rules (+7 more)

### Community 30 - "Transaction History Lists"
Cohesion: 0.20
Nodes (4): customerOrders, employeeTransactions, MockTransaction, TransactionsList()

### Community 31 - "Admin Dashboard Sidebar Layout"
Cohesion: 0.25
Nodes (7): AdminTopbarProps, DashboardTopbar(), getInitials(), EmployeeTopbar(), EmployeeTopbarProps, ROUTE_TITLES, ThemeToggle()

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
Cohesion: 0.15
Nodes (12): Branch, branches, InsertBranch, insertBranchSchema, selectBranchSchema, paymentMethodEnum, InsertTransaction, insertTransactionSchema (+4 more)

### Community 36 - "Admin Notifications Feed"
Cohesion: 0.29
Nodes (6): AdminNotificationsFeed(), badgeColorMap, borderColorMap, iconColorMap, mockNotifications, NotificationItem

### Community 37 - "Cart Items Schema"
Cohesion: 0.17
Nodes (10): CartItem, cartItemsRelations, InsertCartItem, insertCartItemSchema, selectCartItemSchema, InsertUser, insertUserSchema, selectUserSchema (+2 more)

### Community 38 - "Notifications Schema & Enums"
Cohesion: 0.29
Nodes (6): InsertNotification, insertNotificationSchema, Notification, notificationsRelations, notificationTypeEnum, selectNotificationSchema

### Community 39 - "App Constraints & Workflows"
Cohesion: 0.33
Nodes (6): Branch Locking Constraint, No Delivery Architecture, Strict Payment Methods, User Roles, Customer Workflow, Employee Workflow

### Community 40 - "Customer Notifications Feed"
Cohesion: 0.50
Nodes (3): Notification, NotificationsState, useNotificationsStore

### Community 41 - "Edge JWT Auth Utilities"
Cohesion: 0.53
Nodes (4): base64urlToBytes(), verifyJwtEdge(), proxy(), PUBLIC_ROUTES

### Community 42 - "Products Schema"
Cohesion: 0.14
Nodes (14): 1. Prerequisites, 2. Configure Environment Variables, 3. Install Dependencies, 4. Database Setup, 5. Run the Development Server, BentaHub — Centralized Inventory Management and POS System, Direct Docker Compose Commands, Docker Helper Scripts (+6 more)

### Community 44 - "Cashier Navigation Sidebar"
Cohesion: 0.25
Nodes (7): getMonitoring(), BranchInventory, branchInventoryRelations, InsertBranchInventory, insertBranchInventorySchema, selectBranchInventorySchema, transactions

### Community 45 - "Monitoring Metrics UI"
Cohesion: 0.25
Nodes (8): formatCurrency(), getSalesData(), MONTH_NAMES, SalesFilterOptions, SalesOverview, SalesPageData, SalesTransactionRow, SalesTrendPoint

### Community 46 - "Sales Trend Charts"
Cohesion: 0.18
Nodes (10): Build-Time Bypass, 📂 Directory Structure Overview, 🔒 Environment Variable Validation, 🏗️ Feature-First Mini-Applications, Feature Sliced Design (FSD) Architecture Guidelines, Key Rules, Snippet: Form Zod Schemas with Transformations & Refinement, 📖 Table of Contents (+2 more)

### Community 49 - "Notification Types & Severity"
Cohesion: 0.50
Nodes (3): Notification, NotificationCategory, NotificationSeverity

### Community 50 - "Unwired Middleware Auth"
Cohesion: 0.67
Nodes (3): Unwired Middleware Proxy, Authentication Mechanism, Email Verification Flow

### Community 53 - "Community 53"
Cohesion: 0.25
Nodes (14): registerUser(), resendVerificationCodeAction(), verifyEmailAction(), getVerificationEmailHtml(), generateId(), generateVerificationCode(), hashPassword(), hashVerificationCode() (+6 more)

### Community 54 - "Database Client & Seeding"
Cohesion: 0.67
Nodes (3): Adminer DB Client Service, PostgreSQL DB Service, Database Seeding & Reset

### Community 57 - "API Post Route Handlers"
Cohesion: 0.20
Nodes (10): SystemAlerts(), SystemAlertsProps, formatCurrency(), getMonitoringData(), RawBranch, RawInventory, RawProduct, RawTransaction (+2 more)

### Community 68 - "Community 68"
Cohesion: 0.24
Nodes (8): DashboardMobileNav(), DashboardMobileNavProps, DashboardLayout(), getPageTitleAndSubtitle(), NavLink, NavSection, ROLE_NAV_ITEMS, ROLE_TITLES

### Community 69 - "Community 69"
Cohesion: 0.25
Nodes (8): 💻 Available Development Commands, BentaHub Contributing Guide, Core Folder Structure, 🏗️ Feature-Sliced Design (FSD) Guidelines, 🛠️ Local Setup, 📝 Pull Request Checklist, The Isolation Principle, 🚦 Verification & Code Style

### Community 70 - "Community 70"
Cohesion: 0.33
Nodes (6): BRANCHES, envPath, generateId(), PRODUCTS, seedData(), USERS

### Community 71 - "Community 71"
Cohesion: 0.33
Nodes (7): getProducts, getProductsInternal, 1. Caching Strategy & Public/Internal Split, 2. Cache Tagging Levels, 3. Mutations & Revalidation Pattern, ⚡ DB Caching & Query Patterns, dbCache

### Community 72 - "Community 72"
Cohesion: 0.19
Nodes (9): addToCart(), cancelOrder(), createOrder(), removeCartItem(), updateCartItem(), getCart(), getOrderById(), getOrders() (+1 more)

### Community 73 - "Community 73"
Cohesion: 0.33
Nodes (6): HasPermission, Key Rules, 🔐 Permission System Pattern, Snippet: Centralized Permissions Checking, Snippet: Conditional Layout Wrapper component, canCreateProduct

### Community 74 - "Community 74"
Cohesion: 0.50
Nodes (4): createCustomerPortalSession, Good Practice: Returning `void`, Handling Action State & Feedback, 📝 React Form Action Type-Safety

### Community 75 - "Community 75"
Cohesion: 0.50
Nodes (4): RootLayout(), Key Rules, 🎨 Layout & Provider Pattern, Snippet: Root Layout configuration

### Community 76 - "Community 76"
Cohesion: 0.26
Nodes (10): loginAction(), logoutAction(), verifySessionAction(), extractToken(), generateToken(), JWT_SECRET, RequestLike, TokenPayload (+2 more)

### Community 77 - "Community 77"
Cohesion: 0.24
Nodes (8): markAllNotificationsRead(), markNotificationRead(), MarkNotificationReadResult, getNotifications(), GetNotificationsParams, GetNotificationsResult, notifications, markNotificationReadSchema

### Community 78 - "Community 78"
Cohesion: 0.50
Nodes (4): 🌐 API Route Patterns, Key Rules, Snippet: Cryptographic Webhook Handler (Clerk Webhook), Snippet: Edge API Route (discount banner script generator)

### Community 79 - "Community 79"
Cohesion: 0.50
Nodes (4): Key Rules, 🛡️ Middleware Pattern, Snippet: Route Authorization Middleware, middleware.ts

### Community 80 - "Community 80"
Cohesion: 0.22
Nodes (8): verifyResetCode(), forgotPasswordSchema, loginSchema, registerSchema, resendCodeSchema, resetPasswordSchema, verifyEmailSchema, verifyResetCodeSchema

### Community 82 - "Community 82"
Cohesion: 0.50
Nodes (3): InventoryStatusTable(), InventoryStatusTableProps, InventoryStatusItem

### Community 83 - "Community 83"
Cohesion: 0.67
Nodes (3): Key Rules, ⚡ Server Action Patterns, Snippet: Standard Mutation Server Action

### Community 84 - "Community 84"
Cohesion: 0.32
Nodes (6): AuthContext, LoginPayload, LoginResponseData, Session, User, VerifyEmailPayload

### Community 85 - "Community 85"
Cohesion: 0.67
Nodes (3): SalesChart(), SalesChartProps, SalesTrendPointData

### Community 86 - "Community 86"
Cohesion: 0.33
Nodes (5): EmailVerificationCode, emailVerificationRelations, InsertEmailVerificationCode, insertEmailVerificationSchema, selectEmailVerificationSchema

### Community 88 - "Community 88"
Cohesion: 0.50
Nodes (4): Key Rules, Snippet: CLI Seeder Script (updateCountryGroups), ⚙️ Task Script Pattern, updateCountryGroups

### Community 89 - "Community 89"
Cohesion: 0.67
Nodes (3): 🏗️ Drizzle Schema Definition Patterns, Key Rules, Snippet: Schema and Relationships Definitions

### Community 90 - "Community 90"
Cohesion: 0.67
Nodes (3): 🧩 Feature Component Patterns, Key Rules, Snippet: Standard Client Form Component

## Knowledge Gaps
- **330 isolated node(s):** `envPath`, `eslintConfig`, `config`, `metadata`, `demoProducts` (+325 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `RootLayout()` connect `Community 75` to `Root Layout & Global CSS`?**
  _High betweenness centrality (0.221) - this node is a cross-community bridge._
- **Why does `🎨 Layout & Provider Pattern` connect `Community 75` to `FSD Architecture & App Docs`, `Sales Trend Charts`?**
  _High betweenness centrality (0.220) - this node is a cross-community bridge._
- **Why does `useAuth()` connect `Sidebar & Mobile Navigation UI` to `System Settings & Configuration`, `Admin Monitoring & Data Overview`, `Community 68`, `Notification Feed & Read Actions`, `Branch Grid & Footer Layout`, `Sales Data & Overview Retrieval`, `Dashboard Monitoring Mock Data`, `Checkout & Cart Pages`, `Staff Navigation Sidebar`, `Pickup & Payment Management`, `Recent Orders & Transactions Tables`, `Reservations Manager UI`, `Payments Manager Mock Data`, `Transaction History Lists`, `Admin Dashboard Sidebar Layout`?**
  _High betweenness centrality (0.202) - this node is a cross-community bridge._
- **What connects `envPath`, `eslintConfig`, `config` to the rest of the system?**
  _332 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Auth & Password Forms` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `Root Layout & Global CSS` be split into smaller, more focused modules?**
  _Cohesion score 0.13725490196078433 - nodes in this community are weakly interconnected._
- **Should `Stock Management UI` be split into smaller, more focused modules?**
  _Cohesion score 0.13438735177865613 - nodes in this community are weakly interconnected._