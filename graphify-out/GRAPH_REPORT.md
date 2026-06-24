# Graph Report - bentahub  (2026-06-24)

## Corpus Check
- 278 files · ~93,523 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 979 nodes · 1614 edges · 91 communities (70 shown, 21 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3f79d992`
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
- [[_COMMUNITY_Community 81|Community 81]]
- [[_COMMUNITY_Community 82|Community 82]]
- [[_COMMUNITY_Community 83|Community 83]]
- [[_COMMUNITY_Community 84|Community 84]]
- [[_COMMUNITY_Community 85|Community 85]]
- [[_COMMUNITY_Community 86|Community 86]]
- [[_COMMUNITY_Community 87|Community 87]]
- [[_COMMUNITY_Community 88|Community 88]]
- [[_COMMUNITY_Community 89|Community 89]]

## God Nodes (most connected - your core abstractions)
1. `useAuth()` - 42 edges
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
- `EmployeeLayout()` --calls--> `useAuth()`  [EXTRACTED]
  src/app/(dashboard)/employee/layout.tsx → src/hooks/useAuth.ts
- `SharedLayout()` --calls--> `useAuth()`  [EXTRACTED]
  src/app/(dashboard)/shared/layout.tsx → src/hooks/useAuth.ts
- `LiveTransactionFeedProps` --references--> `Transaction`  [EXTRACTED]
  src/features/employee-dashboard/components/live-transaction-feed.tsx → src/types/cashier.ts
- `ProductCard()` --calls--> `getStockStatus()`  [INFERRED]
  src/features/employee-dashboard/components/product-card.tsx → src/features/employee-dashboard/data/products.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **docs_bentahub_rbac_workflows** — docs_bentahub_admin_workflow, docs_bentahub_cashier_workflow, docs_bentahub_staff_workflow, docs_bentahub_customer_workflow [INFERRED 0.95]
- **docs_bentahub_system_constraints** — docs_bentahub_strict_payment_methods, docs_bentahub_no_delivery_architecture, docs_bentahub_role_based_security [INFERRED 0.95]

## Communities (91 total, 21 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.15
Nodes (25): registerSchema, registerUser(), resendCodeSchema, resendVerificationCodeAction(), verifyEmailAction(), verifyEmailSchema, getVerificationEmailHtml(), POST() (+17 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (20): fontMono, fontSans, fontSerif, metadata, AuthHeader(), AuthHeaderProps, AuthContext, AuthContextValue (+12 more)

### Community 2 - "Community 2"
Cohesion: 0.18
Nodes (9): BranchInventory, branchInventoryRelations, InsertBranchInventory, insertBranchInventorySchema, selectBranchInventorySchema, Branch, InsertBranch, insertBranchSchema (+1 more)

### Community 3 - "Community 3"
Cohesion: 0.17
Nodes (11): InsertOrder, InsertOrderItem, insertOrderItemSchema, insertOrderSchema, Order, OrderItem, orderItemsRelations, ordersRelations (+3 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (15): branches, BranchGrid(), CtaBanner(), Footer(), HeroSection(), Navbar(), ProductGrid(), products (+7 more)

### Community 5 - "Community 5"
Cohesion: 0.07
Nodes (33): Admin Workflow, Cashier Workflow, Customer Workflow, BentaHub Developer Manual, Email Verification Codes Table Schema, Feature-Sliced Design Guidelines, FSD Structural Directory Mapping, JWT & Registration Verification Flow (+25 more)

### Community 6 - "Community 6"
Cohesion: 0.05
Nodes (41): RawBranch, RawInventory, RawProduct, RawTransaction, computeTrend(), formatCurrency(), getAdminOverview(), getMonthRange() (+33 more)

### Community 7 - "Community 7"
Cohesion: 0.13
Nodes (13): ProductActions(), ProductActionsProps, ProductBreadcrumb(), ProductBreadcrumbProps, ProductDetailsSection(), ProductDetailsSectionProps, ProductImageGallery(), ProductImageGalleryProps (+5 more)

### Community 8 - "Community 8"
Cohesion: 0.07
Nodes (28): 1. Tech Stack, 2. User Workflows & Permission Loops, 3. System Rules & Constraints, 4. Backend Implementation: Auth & User Management, 5. Customer Portal: Status & Implementation, 6. Architecture & Directory Guidelines, 👑 Admin Workflow (`src/app/admin/`), 🔌 API Route Specifications (+20 more)

### Community 9 - "Community 9"
Cohesion: 0.27
Nodes (9): CartItem(), CartItemProps, CartSidebar(), CartSidebarProps, ProductCatalog(), useCart(), UseCartReturn, EmployeePosPage() (+1 more)

### Community 10 - "Community 10"
Cohesion: 0.17
Nodes (9): HistoryMetrics(), InventoryFlowTrend(), KPICard(), KPICardProps, PickupMetrics(), ReservationMetrics(), BranchOption, SalesFilters() (+1 more)

### Community 11 - "Community 11"
Cohesion: 0.12
Nodes (13): StaffTransactionTable(), StaffTransactionTableProps, GetTransactionsParams, GetTransactionsResult, ReceiptModalProps, ReceiptModalProps, PaymentStatus, PRODUCT_CATEGORIES (+5 more)

### Community 12 - "Community 12"
Cohesion: 0.21
Nodes (8): CartPage(), CheckoutPage(), useCart(), ProductDetailPage(), ProductCardProps, CartItem, CartState, useCartStore

### Community 13 - "Community 13"
Cohesion: 0.14
Nodes (12): InventoryUpdateTableProps, CATEGORIES, ProductCatalogProps, QuickStockModalProps, StaffKpiCards(), StaffKpiCardsProps, StockSummaryCards(), allProducts (+4 more)

### Community 14 - "Community 14"
Cohesion: 0.24
Nodes (5): PaymentPickupList(), TransactionsTable(), allTransactions, staffPayments, staffPickups

### Community 15 - "Community 15"
Cohesion: 0.29
Nodes (7): BRANCHES, envPath, generateId(), PRODUCTS, seedData(), USERS, branches

### Community 16 - "Community 16"
Cohesion: 0.15
Nodes (12): ConfirmPickupModal(), ConfirmPickupModalProps, PickupItem, PickupOrder, PickupDetailsModal(), PickupDetailsModalProps, PickupItem, PickupOrder (+4 more)

### Community 18 - "Community 18"
Cohesion: 0.05
Nodes (42): 💻 Available Development Commands, BentaHub Contributing Guide, Core Folder Structure, Development Commands, 🏗️ Feature-Sliced Design (FSD) Guidelines, Contributing FSD Guidelines, 🛠️ Local Setup, Pull Request Quality Checklist (+34 more)

### Community 19 - "Community 19"
Cohesion: 0.18
Nodes (12): AddStockModal(), AddStockModalProps, CATEGORIES, ProductForm, InventoryUpdateTable(), PaymentItem, PaymentPickupListProps, PickupItem (+4 more)

### Community 20 - "Community 20"
Cohesion: 0.19
Nodes (9): AddUserModal(), AddUserModalProps, DeleteUserModal(), DeleteUserModalProps, EditUserModal(), EditUserModalProps, UserData, mockUsers (+1 more)

### Community 21 - "Community 21"
Cohesion: 0.25
Nodes (6): mockTransactions, Transaction, TransactionDetail, TransactionHistoryModal(), TransactionHistoryModalProps, TransactionItem

### Community 22 - "Community 22"
Cohesion: 0.19
Nodes (9): RecentOrdersTable(), TransactionTable(), ApiOrder, ApiOrderItem, useOrders(), Order, OrderItem, OrdersState (+1 more)

### Community 23 - "Community 23"
Cohesion: 0.17
Nodes (6): DashboardMobileNav(), DashboardMobileNavProps, NearbyBranches(), Pagination(), SummaryCards(), TransactionFilters()

### Community 24 - "Community 24"
Cohesion: 0.22
Nodes (15): formatCurrency(), getMonitoringData(), extractToken(), verifyToken(), GET(), getUserIdFromToken(), PATCH(), getUserIdFromToken() (+7 more)

### Community 25 - "Community 25"
Cohesion: 0.33
Nodes (5): PaymentDetailsModal(), PaymentDetailsModalProps, PaymentRecord, mockPayments, PaymentRecord

### Community 27 - "Community 27"
Cohesion: 0.24
Nodes (7): CatalogPage(), CatalogToolbar(), CategorySidebar(), useProducts(), Product, ProductsState, useProductsStore

### Community 28 - "Community 28"
Cohesion: 0.25
Nodes (7): paymentMethodEnum, InsertTransaction, insertTransactionSchema, selectTransactionSchema, Transaction, transactionRelations, transactionStatusEnum

### Community 30 - "Community 30"
Cohesion: 0.14
Nodes (15): DELETE(), getUserIdFromToken(), PUT(), GET(), getUserIdFromToken(), POST(), CartItem, cartItems (+7 more)

### Community 32 - "Community 32"
Cohesion: 0.22
Nodes (6): AdminNotificationsFeed(), badgeColorMap, borderColorMap, iconColorMap, mockNotifications, NotificationItem

### Community 33 - "Community 33"
Cohesion: 0.36
Nodes (4): PaymentSummaryCards(), PaymentsTable(), payments, Payment

### Community 34 - "Community 34"
Cohesion: 0.12
Nodes (10): MarkReadParams, MarkReadResult, FilterTab, NotificationItem, NotificationsFeed(), roleLabels, roleToBuilder, GetNotificationsParams (+2 more)

### Community 35 - "Community 35"
Cohesion: 0.25
Nodes (5): CustomerNotificationItem, CustomerNotificationsFeed(), FilterTab, mockNotifications, tabs

### Community 37 - "Community 37"
Cohesion: 0.32
Nodes (4): ReservationCard(), ReservationCardProps, ReservationData, ReservationSummary()

### Community 38 - "Community 38"
Cohesion: 0.29
Nodes (6): InsertNotification, insertNotificationSchema, Notification, notificationsRelations, notificationTypeEnum, selectNotificationSchema

### Community 39 - "Community 39"
Cohesion: 0.22
Nodes (10): AdminLayout(), AdminSidebar(), AdminSidebarProps, DashboardSidebar(), DashboardSidebarProps, DashboardTopbar(), getInitials(), CustomerLayout() (+2 more)

### Community 40 - "Community 40"
Cohesion: 0.40
Nodes (3): mockNotifications, StaffNotificationItem, StaffNotificationsFeed()

### Community 42 - "Community 42"
Cohesion: 0.25
Nodes (4): ReservationFilters(), mockReservations, Reservation, ReservationTable()

### Community 43 - "Community 43"
Cohesion: 0.17
Nodes (10): EmailVerificationCode, emailVerificationRelations, InsertEmailVerificationCode, insertEmailVerificationSchema, selectEmailVerificationSchema, InsertUser, insertUserSchema, selectUserSchema (+2 more)

### Community 45 - "Community 45"
Cohesion: 0.33
Nodes (5): InsertProduct, insertProductSchema, Product, productStockStatusEnum, selectProductSchema

### Community 46 - "Community 46"
Cohesion: 0.18
Nodes (9): GET(), getUserIdFromToken(), POST(), client, Database, db, envPath, RouteParams (+1 more)

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
Cohesion: 0.14
Nodes (12): AdminTopbar(), AdminTopbarProps, EmployeeTopbar(), EmployeeTopbarProps, ROUTE_TITLES, ROUTE_TITLES, StaffTopbarProps, ThemeToggle() (+4 more)

### Community 76 - "Community 76"
Cohesion: 0.17
Nodes (10): AlertItem, InventoryRow, LiveTransaction, mockAlerts, mockBranches, mockInventory, mockLiveTransactions, MonitoringDashboard() (+2 more)

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
Cohesion: 0.29
Nodes (7): generateToken(), JWT_SECRET, RequestLike, TokenPayload, verifyPassword(), POST(), LoginResponseData

### Community 81 - "Community 81"
Cohesion: 0.25
Nodes (8): formatCurrency(), getSalesData(), MONTH_NAMES, SalesFilterOptions, SalesOverview, SalesPageData, SalesTransactionRow, SalesTrendPoint

### Community 82 - "Community 82"
Cohesion: 0.25
Nodes (3): SettingsPanel(), GetSettingsParams, SettingsData

### Community 84 - "Community 84"
Cohesion: 0.36
Nodes (6): UserRole, AuthContext, LoginPayload, Session, User, VerifyEmailPayload

### Community 85 - "Community 85"
Cohesion: 0.29
Nodes (4): EmployeeSidebar(), EmployeeSidebarProps, NAV_ITEMS, EmployeeLayout()

### Community 86 - "Community 86"
Cohesion: 0.38
Nodes (3): getHistory(), HistoryRecord, transactions

### Community 87 - "Community 87"
Cohesion: 0.43
Nodes (4): useNotifications(), Notification, NotificationsState, useNotificationsStore

## Knowledge Gaps
- **326 isolated node(s):** `envPath`, `eslintConfig`, `config`, `pool`, `pool` (+321 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useAuth()` connect `Community 39` to `Community 34`, `Community 73`, `Community 74`, `Community 76`, `Community 77`, `Community 78`, `Community 79`, `Community 12`, `Community 82`, `Community 85`, `Community 22`, `Community 87`, `Community 88`?**
  _High betweenness centrality (0.206) - this node is a cross-community bridge._
- **Why does `db` connect `Community 46` to `Community 0`, `Community 6`, `Community 76`, `Community 15`, `Community 80`, `Community 81`, `Community 86`, `Community 24`, `Community 30`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `AdminSidebar()` connect `Community 39` to `Community 10`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `verifyToken()` (e.g. with `PATCH()` and `GET()`) actually correct?**
  _`verifyToken()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `extractToken()` (e.g. with `PATCH()` and `GET()`) actually correct?**
  _`extractToken()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `envPath`, `eslintConfig`, `config` to the rest of the system?**
  _329 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.053877551020408164 - nodes in this community are weakly interconnected._