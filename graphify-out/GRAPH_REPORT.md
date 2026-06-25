# Graph Report - bentahub  (2026-06-25)

## Corpus Check
- 262 files · ~93,617 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 951 nodes · 1562 edges · 84 communities (66 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `95444a5e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 82|Community 82]]
- [[_COMMUNITY_Community 87|Community 87]]
- [[_COMMUNITY_Community 89|Community 89]]

## God Nodes (most connected - your core abstractions)
1. `useAuth()` - 44 edges
2. `db` - 25 edges
3. `verifyToken()` - 22 edges
4. `extractToken()` - 22 edges
5. `generateId()` - 18 edges
6. `Product` - 15 edges
7. `users` - 14 edges
8. `Transaction` - 13 edges
9. `useCart()` - 12 edges
10. `hashVerificationCode()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `seedProducts()` --calls--> `generateId()`  [EXTRACTED]
  scripts/seed-products.ts → src/lib/auth-utils.ts
- `SharedLayout()` --calls--> `useAuth()`  [EXTRACTED]
  src/app/(dashboard)/shared/layout.tsx → src/hooks/useAuth.ts
- `GET()` --calls--> `getMonitoringData()`  [INFERRED]
  src/app/api/admin/notifications/route.ts → src/features/admin-dashboard/actions/get-monitoring.ts
- `ProductCard()` --calls--> `getStockStatus()`  [INFERRED]
  src/features/employee-dashboard/components/product-card.tsx → src/features/employee-dashboard/data/products.ts
- `Contributing FSD Guidelines` --semantically_similar_to--> `FSD Isolation Principle Details`  [INFERRED] [semantically similar]
  docs/CONTRIBUTING.md → docs/FEATURE-SLICED-DESIGN.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **docs_bentahub_rbac_workflows** — docs_bentahub_admin_workflow, docs_bentahub_cashier_workflow, docs_bentahub_staff_workflow, docs_bentahub_customer_workflow [INFERRED 0.95]
- **docs_bentahub_system_constraints** — docs_bentahub_strict_payment_methods, docs_bentahub_no_delivery_architecture, docs_bentahub_role_based_security [INFERRED 0.95]

## Communities (84 total, 18 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (45): registerSchema, registerUser(), resendCodeSchema, resendVerificationCodeAction(), verifyEmailAction(), verifyEmailSchema, getVerificationEmailHtml(), RegisterForm() (+37 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (18): fontMono, fontSans, fontSerif, metadata, AuthHeader(), AuthHeaderProps, AuthContext, AuthContextValue (+10 more)

### Community 2 - "Community 2"
Cohesion: 0.17
Nodes (10): BranchInventory, branchInventoryRelations, InsertBranchInventory, insertBranchInventorySchema, selectBranchInventorySchema, InsertProduct, insertProductSchema, Product (+2 more)

### Community 3 - "Community 3"
Cohesion: 0.15
Nodes (12): InsertOrder, InsertOrderItem, insertOrderItemSchema, insertOrderSchema, Order, OrderItem, orderItemsRelations, ordersRelations (+4 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (15): branches, BranchGrid(), CtaBanner(), Footer(), HeroSection(), Navbar(), ProductGrid(), products (+7 more)

### Community 5 - "Community 5"
Cohesion: 0.07
Nodes (33): Admin Workflow, Cashier Workflow, Customer Workflow, BentaHub Developer Manual, Email Verification Codes Table Schema, Feature-Sliced Design Guidelines, FSD Structural Directory Mapping, JWT & Registration Verification Flow (+25 more)

### Community 6 - "Community 6"
Cohesion: 0.26
Nodes (10): computeTrend(), formatCurrency(), getAdminOverview(), getMonthRange(), MONTH_NAMES, RawBranch, RawInventory, RawTransaction (+2 more)

### Community 7 - "Community 7"
Cohesion: 0.13
Nodes (13): ProductActions(), ProductActionsProps, ProductBreadcrumb(), ProductBreadcrumbProps, ProductDetailsSection(), ProductDetailsSectionProps, ProductImageGallery(), ProductImageGalleryProps (+5 more)

### Community 8 - "Community 8"
Cohesion: 0.07
Nodes (28): 1. Tech Stack, 2. User Workflows & Permission Loops, 3. System Rules & Constraints, 4. Backend Implementation: Auth & User Management, 5. Customer Portal: Status & Implementation, 6. Architecture & Directory Guidelines, 👑 Admin Workflow (`src/app/admin/`), 🔌 API Route Specifications (+20 more)

### Community 9 - "Community 9"
Cohesion: 0.23
Nodes (10): CartItem(), CartItemProps, CartSidebar(), CartSidebarProps, CATEGORIES, ProductCatalog(), useCart(), UseCartReturn (+2 more)

### Community 10 - "Community 10"
Cohesion: 0.20
Nodes (7): HistoryMetrics(), InventoryFlowTrend(), PaymentMetrics(), PickupMetrics(), ReservationFilters(), ReservationMetrics(), UserMetrics()

### Community 11 - "Community 11"
Cohesion: 0.10
Nodes (18): LiveTransactionFeed(), LiveTransactionFeedProps, StaffTransactionTable(), StaffTransactionTableProps, allTransactions, staffPayments, staffPickups, GetTransactionsParams (+10 more)

### Community 12 - "Community 12"
Cohesion: 0.21
Nodes (8): CartPage(), CheckoutPage(), useCart(), ProductDetailPage(), ProductCardProps, CartItem, CartState, useCartStore

### Community 13 - "Community 13"
Cohesion: 0.15
Nodes (11): InventoryUpdateTableProps, ProductCatalogProps, QuickStockModalProps, StaffKpiCards(), StaffKpiCardsProps, StockSummaryCards(), allProducts, getStockStatus() (+3 more)

### Community 14 - "Community 14"
Cohesion: 0.12
Nodes (10): BranchStockItem, BranchStockOverview(), BranchStockOverviewProps, STATUS_COLORS, KPICard(), KPICardProps, SalesChart(), SalesChartProps (+2 more)

### Community 15 - "Community 15"
Cohesion: 0.24
Nodes (8): DashboardMobileNav(), DashboardMobileNavProps, DashboardLayout(), getPageTitleAndSubtitle(), NavLink, NavSection, ROLE_NAV_ITEMS, ROLE_TITLES

### Community 16 - "Community 16"
Cohesion: 0.15
Nodes (12): ConfirmPickupModal(), ConfirmPickupModalProps, PickupItem, PickupOrder, PickupDetailsModal(), PickupDetailsModalProps, PickupItem, PickupOrder (+4 more)

### Community 17 - "Community 17"
Cohesion: 0.13
Nodes (17): formatCurrency(), getMonitoringData(), RawBranch, RawInventory, RawProduct, RawTransaction, InventoryStatusTable(), InventoryStatusTableProps (+9 more)

### Community 18 - "Community 18"
Cohesion: 0.05
Nodes (42): 💻 Available Development Commands, BentaHub Contributing Guide, Core Folder Structure, Development Commands, 🏗️ Feature-Sliced Design (FSD) Guidelines, Contributing FSD Guidelines, 🛠️ Local Setup, Pull Request Quality Checklist (+34 more)

### Community 19 - "Community 19"
Cohesion: 0.13
Nodes (16): AddStockModal(), AddStockModalProps, CATEGORIES, ProductForm, InventoryUpdateTable(), PaymentItem, PaymentPickupList(), PaymentPickupListProps (+8 more)

### Community 20 - "Community 20"
Cohesion: 0.19
Nodes (9): AddUserModal(), AddUserModalProps, DeleteUserModal(), DeleteUserModalProps, EditUserModal(), EditUserModalProps, UserData, mockUsers (+1 more)

### Community 21 - "Community 21"
Cohesion: 0.25
Nodes (6): mockTransactions, Transaction, TransactionDetail, TransactionHistoryModal(), TransactionHistoryModalProps, TransactionItem

### Community 22 - "Community 22"
Cohesion: 0.21
Nodes (10): demoOrders, RecentOrdersTable(), TransactionTable(), ApiOrder, ApiOrderItem, useOrders(), Order, OrderItem (+2 more)

### Community 23 - "Community 23"
Cohesion: 0.13
Nodes (5): CatalogToolbar(), Pagination(), ReservationCardProps, ReservationData, SummaryCards()

### Community 24 - "Community 24"
Cohesion: 0.23
Nodes (14): DELETE(), getUserIdFromToken(), PUT(), extractToken(), verifyToken(), getUserIdFromToken(), PATCH(), getUserIdFromToken() (+6 more)

### Community 25 - "Community 25"
Cohesion: 0.29
Nodes (6): PaymentDetailsModal(), PaymentDetailsModalProps, PaymentRecord, mockPayments, PaymentRecord, PaymentTable()

### Community 26 - "Community 26"
Cohesion: 0.16
Nodes (9): BranchOption, SalesFilters(), SalesFiltersProps, SalesMetrics(), SalesMetricsProps, TransactionDetailsTable(), TransactionDetailsTableProps, SalesOverviewData (+1 more)

### Community 27 - "Community 27"
Cohesion: 0.27
Nodes (7): CatalogPage(), demoProducts, CategorySidebar(), useProducts(), Product, ProductsState, useProductsStore

### Community 28 - "Community 28"
Cohesion: 0.17
Nodes (10): Branch, InsertBranch, insertBranchSchema, selectBranchSchema, InsertTransaction, insertTransactionSchema, selectTransactionSchema, Transaction (+2 more)

### Community 30 - "Community 30"
Cohesion: 0.29
Nodes (6): CartItem, cartItems, cartItemsRelations, InsertCartItem, insertCartItemSchema, selectCartItemSchema

### Community 32 - "Community 32"
Cohesion: 0.29
Nodes (6): AdminNotificationsFeed(), badgeColorMap, borderColorMap, iconColorMap, mockNotifications, NotificationItem

### Community 34 - "Community 34"
Cohesion: 0.12
Nodes (10): MarkReadParams, MarkReadResult, FilterTab, NotificationItem, NotificationsFeed(), roleLabels, roleToBuilder, GetNotificationsParams (+2 more)

### Community 35 - "Community 35"
Cohesion: 0.33
Nodes (4): CustomerNotificationItem, FilterTab, mockNotifications, tabs

### Community 36 - "Community 36"
Cohesion: 0.20
Nodes (9): GET(), getUserIdFromToken(), POST(), client, Database, db, envPath, RouteParams (+1 more)

### Community 37 - "Community 37"
Cohesion: 0.17
Nodes (12): generateToken(), JWT_SECRET, RequestLike, TokenPayload, verifyPassword(), POST(), GET(), getUserIdFromToken() (+4 more)

### Community 38 - "Community 38"
Cohesion: 0.20
Nodes (10): formatCurrency(), getSalesData(), MONTH_NAMES, SalesFilterOptions, SalesOverview, SalesPageData, SalesTransactionRow, SalesTrendPoint (+2 more)

### Community 39 - "Community 39"
Cohesion: 0.12
Nodes (15): AdminLayout(), AdminSidebar(), AdminSidebarProps, DashboardSidebar(), DashboardSidebarProps, EmployeeSidebar(), EmployeeSidebarProps, NAV_ITEMS (+7 more)

### Community 40 - "Community 40"
Cohesion: 0.29
Nodes (7): BRANCHES, envPath, generateId(), PRODUCTS, seedData(), USERS, branches

### Community 42 - "Community 42"
Cohesion: 0.43
Nodes (3): MonitoringDashboard(), getMonitoring(), MonitoringSummary

### Community 43 - "Community 43"
Cohesion: 0.33
Nodes (5): InsertUser, insertUserSchema, selectUserSchema, User, userRoleEnum

### Community 45 - "Community 45"
Cohesion: 0.38
Nodes (3): getHistory(), HistoryRecord, transactions

### Community 46 - "Community 46"
Cohesion: 0.67
Nodes (3): MonitoringMetrics(), MonitoringMetricsProps, MonitoringMetricsData

### Community 47 - "Community 47"
Cohesion: 0.50
Nodes (3): Notification, NotificationCategory, NotificationSeverity

### Community 49 - "Community 49"
Cohesion: 0.50
Nodes (3): DATABASE_URL, Environment Variables Reference, JWT_SECRET

### Community 53 - "Community 53"
Cohesion: 0.17
Nodes (11): App structure, Architecture & FSD rules, Auth & security, Commands, graphify, Known gotchas, Project overview, Roles & constraints (+3 more)

### Community 66 - "Community 66"
Cohesion: 0.53
Nodes (4): base64urlToBytes(), verifyJwtEdge(), proxy(), PUBLIC_ROUTES

### Community 73 - "Community 73"
Cohesion: 0.14
Nodes (9): CustomerTab, mockReservations, ReservationData, ReservationsManager(), statusLabels, statusStyles, GetReservationsParams, GetReservationsResult (+1 more)

### Community 74 - "Community 74"
Cohesion: 0.15
Nodes (11): AdminTopbar(), AdminTopbarProps, DashboardTopbar(), getInitials(), EmployeeTopbar(), EmployeeTopbarProps, ROUTE_TITLES, ROUTE_TITLES (+3 more)

### Community 76 - "Community 76"
Cohesion: 0.25
Nodes (7): AlertItem, InventoryRow, LiveTransaction, mockAlerts, mockBranches, mockInventory, mockLiveTransactions

### Community 77 - "Community 77"
Cohesion: 0.14
Nodes (9): mockPayments, mockPickups, PaymentItem, PickupItem, PickupsManager(), Tab, GetPickupsParams, GetPickupsResult (+1 more)

### Community 78 - "Community 78"
Cohesion: 0.15
Nodes (8): mockPayments, PaymentItem, PaymentMethod, PaymentsManager(), PaymentStatus, GetPaymentsParams, GetPaymentsResult, PaymentRecord

### Community 79 - "Community 79"
Cohesion: 0.20
Nodes (4): customerOrders, employeeTransactions, MockTransaction, TransactionsList()

### Community 80 - "Community 80"
Cohesion: 0.50
Nodes (3): mockReservations, Reservation, ReservationTable()

### Community 82 - "Community 82"
Cohesion: 0.25
Nodes (3): SettingsPanel(), GetSettingsParams, SettingsData

### Community 87 - "Community 87"
Cohesion: 0.43
Nodes (4): useNotifications(), Notification, NotificationsState, useNotificationsStore

## Knowledge Gaps
- **332 isolated node(s):** `envPath`, `eslintConfig`, `config`, `pool`, `pool` (+327 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useAuth()` connect `Community 39` to `Community 34`, `Community 73`, `Community 74`, `Community 42`, `Community 76`, `Community 77`, `Community 78`, `Community 79`, `Community 15`, `Community 12`, `Community 82`, `Community 22`, `Community 87`?**
  _High betweenness centrality (0.207) - this node is a cross-community bridge._
- **Why does `db` connect `Community 36` to `Community 0`, `Community 37`, `Community 38`, `Community 6`, `Community 40`, `Community 42`, `Community 45`, `Community 17`, `Community 24`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `AdminSidebar()` connect `Community 39` to `Community 10`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `verifyToken()` (e.g. with `PATCH()` and `GET()`) actually correct?**
  _`verifyToken()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `extractToken()` (e.g. with `PATCH()` and `GET()`) actually correct?**
  _`extractToken()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `envPath`, `eslintConfig`, `config` to the rest of the system?**
  _335 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06845238095238096 - nodes in this community are weakly interconnected._