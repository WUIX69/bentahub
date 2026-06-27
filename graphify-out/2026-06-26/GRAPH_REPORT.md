# Graph Report - bentahub  (2026-06-26)

## Corpus Check
- 257 files · ~88,480 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 949 nodes · 1635 edges · 86 communities (69 shown, 17 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ad97b459`
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

## God Nodes (most connected - your core abstractions)
1. `useAuth()` - 46 edges
2. `db` - 35 edges
3. `verifyToken()` - 25 edges
4. `extractToken()` - 25 edges
5. `Feature Sliced Design (FSD) Architecture Guidelines` - 18 edges
6. `Feature Sliced Design (FSD) Guidelines` - 17 edges
7. `generateId()` - 16 edges
8. `Product` - 15 edges
9. `users` - 13 edges
10. `Transaction` - 13 edges

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
- None detected.

## Hyperedges (group relationships)
- **FSD Core Architectural Principles** — docs_feature_sliced_design_architecture, docs_feature_sliced_design_rule_of_promotion, docs_feature_sliced_design_import_boundary_rules [EXTRACTED 1.00]
- **Permissions and Access Control Flow** — docs_feature_sliced_design_permission_system_pattern, lib_permissions_cancreateproduct, components_haspermission_haspermission [EXTRACTED 1.00]

## Communities (86 total, 17 thin omitted)

### Community 0 - "User Registration & Verification"
Cohesion: 0.06
Nodes (59): addToCart(), cancelOrder(), createOrder(), markNotificationRead(), MarkNotificationReadParams, MarkNotificationReadResult, removeCartItem(), updateCartItem() (+51 more)

### Community 1 - "Admin Monitoring & Data Overview"
Cohesion: 0.05
Nodes (46): InventoryStatusTable(), InventoryStatusTableProps, MonitoringMetrics(), MonitoringMetricsProps, SalesChart(), SalesChartProps, SalesMetrics(), SalesMetricsProps (+38 more)

### Community 2 - "Sidebar & Mobile Navigation UI"
Cohesion: 0.17
Nodes (11): DashboardSidebar(), DashboardSidebarProps, EmployeeSidebar(), EmployeeSidebarProps, NAV_ITEMS, NearbyBranches(), CustomerLayout(), CustomerPage() (+3 more)

### Community 3 - "Auth & Password Forms"
Cohesion: 0.17
Nodes (11): App structure, Architecture & FSD rules, Auth & security, Commands, graphify, Known gotchas, Project overview, Roles & constraints (+3 more)

### Community 4 - "FSD Architecture & App Docs"
Cohesion: 0.28
Nodes (9): Feature Sliced Design Architecture, Build-Time Bypass, Feature Sliced Design (FSD) Guidelines, 🏗️ Drizzle Schema Definition Patterns, 🔒 Environment Variable Validation, 🛑 Import Boundary Rules, Key Rules, Rule of Promotion (+1 more)

### Community 5 - "Root Layout & Global CSS"
Cohesion: 0.11
Nodes (12): fontMono, fontSans, fontSerif, metadata, AuthContext, AuthContextValue, AuthProvider(), AuthProviderProps (+4 more)

### Community 6 - "Staff KPI & Stock Status"
Cohesion: 0.15
Nodes (11): InventoryUpdateTableProps, ProductCatalogProps, QuickStockModalProps, StaffKpiCards(), StaffKpiCardsProps, StockSummaryCards(), allProducts, getStockStatus() (+3 more)

### Community 7 - "Stock Management UI"
Cohesion: 0.13
Nodes (16): AddStockModal(), AddStockModalProps, CATEGORIES, ProductForm, InventoryUpdateTable(), PaymentItem, PaymentPickupList(), PaymentPickupListProps (+8 more)

### Community 8 - "Live Transaction Feed UI"
Cohesion: 0.10
Nodes (18): LiveTransactionFeed(), LiveTransactionFeedProps, StaffTransactionTable(), StaffTransactionTableProps, allTransactions, staffPayments, staffPickups, GetTransactionsParams (+10 more)

### Community 9 - "Notification Feed & Read Actions"
Cohesion: 0.22
Nodes (4): FilterTab, NotificationsFeed(), roleLabels, roleToBuilder

### Community 10 - "Branch Grid & Footer Layout"
Cohesion: 0.11
Nodes (10): branches, BranchGrid(), CtaBanner(), Footer(), HeroSection(), Navbar(), ProductGrid(), products (+2 more)

### Community 11 - "Dashboard Metrics & Charts"
Cohesion: 0.13
Nodes (12): HistoryMetrics(), InventoryFlowTrend(), KPICard(), KPICardProps, PaymentMetrics(), PickupMetrics(), ReservationFilters(), ReservationMetrics() (+4 more)

### Community 13 - "Product Details & UI Actions"
Cohesion: 0.13
Nodes (13): ProductActions(), ProductActionsProps, ProductBreadcrumb(), ProductBreadcrumbProps, ProductDetailsSection(), ProductDetailsSectionProps, ProductImageGallery(), ProductImageGalleryProps (+5 more)

### Community 14 - "Cart Sidebar UI Components"
Cohesion: 0.23
Nodes (10): CartItem(), CartItemProps, CartSidebar(), CartSidebarProps, CATEGORIES, ProductCatalog(), useCart(), UseCartReturn (+2 more)

### Community 15 - "Dashboard Monitoring Mock Data"
Cohesion: 0.20
Nodes (8): AlertItem, InventoryRow, LiveTransaction, mockAlerts, mockBranches, mockInventory, mockLiveTransactions, MonitoringDashboard()

### Community 16 - "Checkout & Cart Pages"
Cohesion: 0.21
Nodes (8): CartPage(), CheckoutPage(), useCart(), ProductDetailPage(), ProductCardProps, CartItem, CartState, useCartStore

### Community 17 - "Pickup Modal & Order Details"
Cohesion: 0.15
Nodes (12): ConfirmPickupModal(), ConfirmPickupModalProps, PickupItem, PickupOrder, PickupDetailsModal(), PickupDetailsModalProps, PickupItem, PickupOrder (+4 more)

### Community 18 - "Pickup & Payment Management"
Cohesion: 0.14
Nodes (9): mockPayments, mockPickups, PaymentItem, PickupItem, PickupsManager(), Tab, GetPickupsParams, GetPickupsResult (+1 more)

### Community 19 - "Recent Orders & Transactions Tables"
Cohesion: 0.22
Nodes (8): demoOrders, RecentOrdersTable(), TransactionTable(), useOrders(), Order, OrderItem, OrdersState, useOrdersStore

### Community 20 - "Reservations Manager UI"
Cohesion: 0.14
Nodes (9): CustomerTab, mockReservations, ReservationData, ReservationsManager(), statusLabels, statusStyles, GetReservationsParams, GetReservationsResult (+1 more)

### Community 22 - "Payments Manager Mock Data"
Cohesion: 0.15
Nodes (8): mockPayments, PaymentItem, PaymentMethod, PaymentsManager(), PaymentStatus, GetPaymentsParams, GetPaymentsResult, PaymentRecord

### Community 23 - "Catalog Page & Sidebar"
Cohesion: 0.27
Nodes (7): CatalogPage(), demoProducts, Pagination(), useProducts(), Product, ProductsState, useProductsStore

### Community 24 - "Admin User Management Modals"
Cohesion: 0.19
Nodes (9): AddUserModal(), AddUserModalProps, DeleteUserModal(), DeleteUserModalProps, EditUserModal(), EditUserModalProps, UserData, mockUsers (+1 more)

### Community 25 - "Catalog Toolbar & Reservation Cards"
Cohesion: 0.18
Nodes (3): CatalogToolbar(), CategorySidebar(), SummaryCards()

### Community 26 - "Branch Inventory Schema"
Cohesion: 0.33
Nodes (5): InsertProduct, insertProductSchema, Product, productStockStatusEnum, selectProductSchema

### Community 27 - "Email Verification Schema"
Cohesion: 0.05
Nodes (41): registerSchema, registerUser(), resendCodeSchema, resendVerificationCodeAction(), verifyResetCode(), verifyEmailAction(), verifyEmailSchema, AuthHeader() (+33 more)

### Community 28 - "Orders Schema & Types"
Cohesion: 0.17
Nodes (11): InsertOrder, InsertOrderItem, insertOrderItemSchema, insertOrderSchema, Order, OrderItem, orderItemsRelations, ordersRelations (+3 more)

### Community 29 - "Admin Stock Overview Panel"
Cohesion: 0.12
Nodes (15): 1. Tech Stack, 2. User Workflows & Permission Loops, 3. System Rules & Constraints, 4. Backend & Auth Implementation, 5. Directory & FSD Guidelines, 👑 Admin Workflow (`src/app/(dashboard)/admin/`), BentaHub — Unified Developer Reference Manual, 🛑 Coding & Import Rules (+7 more)

### Community 30 - "Transaction History Lists"
Cohesion: 0.20
Nodes (4): customerOrders, employeeTransactions, MockTransaction, TransactionsList()

### Community 31 - "Admin Dashboard Sidebar Layout"
Cohesion: 0.18
Nodes (9): AdminTopbarProps, DashboardTopbar(), getInitials(), EmployeeTopbar(), EmployeeTopbarProps, ROUTE_TITLES, ROUTE_TITLES, StaffTopbarProps (+1 more)

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
Cohesion: 0.33
Nodes (4): CustomerNotificationItem, FilterTab, mockNotifications, tabs

### Community 41 - "Edge JWT Auth Utilities"
Cohesion: 0.53
Nodes (4): base64urlToBytes(), verifyJwtEdge(), proxy(), PUBLIC_ROUTES

### Community 42 - "Products Schema"
Cohesion: 0.14
Nodes (14): 1. Prerequisites, 2. Configure Environment Variables, 3. Install Dependencies, 4. Database Setup, 5. Run the Development Server, BentaHub — Centralized Inventory Management and POS System, Direct Docker Compose Commands, Docker Helper Scripts (+6 more)

### Community 43 - "Admin Users Page"
Cohesion: 0.20
Nodes (5): AdminLayout(), AdminSidebar(), AdminSidebarProps, AdminTopbar(), UserTable()

### Community 45 - "Monitoring Metrics UI"
Cohesion: 0.18
Nodes (11): BentaHub Runbook, Database Updates, 🚀 Deployment Procedures, 📊 Health Checks & Monitoring, Issue: Cross-feature imports compiler errors, Issue: Database connection failures, Issue: Multiprocessing ProcessPoolExecutor crashes on Windows, Production Build & Launch (+3 more)

### Community 46 - "Sales Trend Charts"
Cohesion: 0.15
Nodes (12): 📂 Directory Structure Overview, 🧩 Feature Component Patterns, 🏗️ Feature-First Mini-Applications, Feature Sliced Design (FSD) Architecture Guidelines, Key Rules, Key Rules, Snippet: CLI Seeder Script (updateCountryGroups), Snippet: Standard Client Form Component (+4 more)

### Community 49 - "Notification Types & Severity"
Cohesion: 0.50
Nodes (3): Notification, NotificationCategory, NotificationSeverity

### Community 50 - "Unwired Middleware Auth"
Cohesion: 0.67
Nodes (3): Unwired Middleware Proxy, Authentication Mechanism, Email Verification Flow

### Community 54 - "Database Client & Seeding"
Cohesion: 0.67
Nodes (3): Adminer DB Client Service, PostgreSQL DB Service, Database Seeding & Reset

### Community 68 - "Community 68"
Cohesion: 0.24
Nodes (8): DashboardMobileNav(), DashboardMobileNavProps, DashboardLayout(), getPageTitleAndSubtitle(), NavLink, NavSection, ROLE_NAV_ITEMS, ROLE_TITLES

### Community 69 - "Community 69"
Cohesion: 0.15
Nodes (9): 💻 Available Development Commands, BentaHub Contributing Guide, Core Folder Structure, 🏗️ Feature-Sliced Design (FSD) Guidelines, 🛠️ Local Setup, 📝 Pull Request Checklist, The Isolation Principle, 🚦 Verification & Code Style (+1 more)

### Community 70 - "Community 70"
Cohesion: 0.33
Nodes (6): BRANCHES, envPath, generateId(), PRODUCTS, seedData(), USERS

### Community 71 - "Community 71"
Cohesion: 0.33
Nodes (7): getProducts, getProductsInternal, 1. Caching Strategy & Public/Internal Split, 2. Cache Tagging Levels, 3. Mutations & Revalidation Pattern, ⚡ DB Caching & Query Patterns, dbCache

### Community 72 - "Community 72"
Cohesion: 0.36
Nodes (5): markAllNotificationsRead(), useNotifications(), Notification, NotificationsState, useNotificationsStore

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
Cohesion: 0.50
Nodes (3): mockReservations, Reservation, ReservationTable()

### Community 77 - "Community 77"
Cohesion: 0.22
Nodes (8): getMonitoring(), MonitoringSummary, BranchInventory, branchInventoryRelations, InsertBranchInventory, insertBranchInventorySchema, selectBranchInventorySchema, transactions

### Community 78 - "Community 78"
Cohesion: 0.50
Nodes (4): 🌐 API Route Patterns, Key Rules, Snippet: Cryptographic Webhook Handler (Clerk Webhook), Snippet: Edge API Route (discount banner script generator)

### Community 79 - "Community 79"
Cohesion: 0.50
Nodes (4): Key Rules, 🛡️ Middleware Pattern, Snippet: Route Authorization Middleware, middleware.ts

### Community 80 - "Community 80"
Cohesion: 0.32
Nodes (5): AdminPage(), BranchStockItem, BranchStockOverview(), BranchStockOverviewProps, STATUS_COLORS

### Community 83 - "Community 83"
Cohesion: 0.67
Nodes (3): Key Rules, ⚡ Server Action Patterns, Snippet: Standard Mutation Server Action

### Community 84 - "Community 84"
Cohesion: 0.67
Nodes (3): TransactionDetailsTable(), TransactionDetailsTableProps, SalesTransactionRowData

### Community 85 - "Community 85"
Cohesion: 0.67
Nodes (3): Key Rules, Snippet: Form Zod Schemas with Transformations & Refinement, 📋 Zod Schema Patterns

## Knowledge Gaps
- **337 isolated node(s):** `envPath`, `eslintConfig`, `config`, `metadata`, `demoProducts` (+332 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `RootLayout()` connect `Community 75` to `Root Layout & Global CSS`?**
  _High betweenness centrality (0.208) - this node is a cross-community bridge._
- **Why does `🎨 Layout & Provider Pattern` connect `Community 75` to `FSD Architecture & App Docs`, `Sales Trend Charts`?**
  _High betweenness centrality (0.207) - this node is a cross-community bridge._
- **Why does `useAuth()` connect `Sidebar & Mobile Navigation UI` to `User Registration & Verification`, `System Settings & Configuration`, `Community 68`, `Community 72`, `Notification Feed & Read Actions`, `Admin Users Page`, `Sales Data & Overview Retrieval`, `Dashboard Monitoring Mock Data`, `Community 80`, `Checkout & Cart Pages`, `Pickup & Payment Management`, `Recent Orders & Transactions Tables`, `Reservations Manager UI`, `Payments Manager Mock Data`, `Transaction History Lists`, `Admin Dashboard Sidebar Layout`?**
  _High betweenness centrality (0.203) - this node is a cross-community bridge._
- **What connects `envPath`, `eslintConfig`, `config` to the rest of the system?**
  _339 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `User Registration & Verification` be split into smaller, more focused modules?**
  _Cohesion score 0.06293859649122807 - nodes in this community are weakly interconnected._
- **Should `Admin Monitoring & Data Overview` be split into smaller, more focused modules?**
  _Cohesion score 0.052600818234950324 - nodes in this community are weakly interconnected._
- **Should `Root Layout & Global CSS` be split into smaller, more focused modules?**
  _Cohesion score 0.10822510822510822 - nodes in this community are weakly interconnected._