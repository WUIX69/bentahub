# Graph Report - .  (2026-06-23)

## Corpus Check
- 4 files · ~81,487 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 781 nodes · 1349 edges · 79 communities (64 shown, 15 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 23 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

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
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 77|Community 77]]

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
- `Local Development Setup` --conceptually_related_to--> `Postgres Database Service (Docker)`  [INFERRED]
  README.md → docker-compose.yml
- `seedProducts()` --calls--> `generateId()`  [EXTRACTED]
  scripts/seed-products.ts → src/lib/auth-utils.ts
- `Customer Portal FSD Architecture` --semantically_similar_to--> `FSD Isolation Principle Details`  [INFERRED] [semantically similar]
  docs/CUSTOMER_SYSTEM_STATUS.md → docs/FEATURE-SLICED-DESIGN.md
- `GET()` --calls--> `getMonitoringData()`  [INFERRED]
  src/app/api/admin/notifications/route.ts → src/features/admin-dashboard/actions/get-monitoring.ts
- `ReservationsPage()` --calls--> `useOrders()`  [INFERRED]
  src/app/customer/reservations/page.tsx → src/hooks/useOrders.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **hyperedge_fsd_alignment** — docs_feature_sliced_design, docs_bentahub_domain_isolation_principle, docs_bentahub_import_rules, docs_customer_system_status_fsd_alignment, docs_implementation_summary_fsd_alignment, docs_contributing_fsd_guidelines [INFERRED]
- **hyperedge_registration_verification_flow** — docs_backend_setup_registration_flow, docs_implementation_summary_api_endpoints, docs_implementation_summary_frontend_components, docs_backend_setup_auth_routes [INFERRED]
- **hyperedge_local_setup** — docs_backend_setup_setup_instructions, docs_bentahub_tech_stack, docs_contributing_setup_steps, docs_contributing_dev_commands [INFERRED]

## Communities (79 total, 15 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.08
Nodes (45): registerSchema, registerUser(), resendCodeSchema, resendVerificationCodeAction(), verifyEmailAction(), verifyEmailSchema, POST(), getVerificationEmailHtml() (+37 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (17): fontMono, fontSans, fontSerif, metadata, AuthHeader(), AuthContext, AuthContextValue, AuthProvider() (+9 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (33): Authentication API Routes, Database Schema (Users & Verification Codes), FSD File Structure Alignment, Route Protection Middleware, Registration & Verification Flow, Security Implementations, Backend Setup Instructions, Backend Tech Stack (+25 more)

### Community 3 - "Community 3"
Cohesion: 0.08
Nodes (19): AuthHeaderProps, branches, BranchGrid(), CtaBanner(), DashboardSidebar(), DashboardSidebarProps, Footer(), HeroSection() (+11 more)

### Community 4 - "Community 4"
Cohesion: 0.08
Nodes (22): CartItem, cartItems, cartItemsRelations, InsertCartItem, insertCartItemSchema, selectCartItemSchema, EmailVerificationCode, emailVerificationRelations (+14 more)

### Community 5 - "Community 5"
Cohesion: 0.13
Nodes (13): ProductActions(), ProductActionsProps, ProductBreadcrumb(), ProductBreadcrumbProps, ProductDetailsSection(), ProductDetailsSectionProps, ProductImageGallery(), ProductImageGalleryProps (+5 more)

### Community 6 - "Community 6"
Cohesion: 0.22
Nodes (15): GET(), getUserIdFromToken(), DELETE(), getUserIdFromToken(), PUT(), extractToken(), verifyToken(), getUserIdFromToken() (+7 more)

### Community 7 - "Community 7"
Cohesion: 0.20
Nodes (14): computeTrend(), formatCurrency(), getAdminOverview(), getMonthRange(), MONTH_NAMES, RawBranch, RawInventory, RawTransaction (+6 more)

### Community 8 - "Community 8"
Cohesion: 0.21
Nodes (11): CashierPage(), CartItem(), CartItemProps, CartSidebar(), CartSidebarProps, CATEGORIES, ProductCatalog(), ProductCatalogProps (+3 more)

### Community 9 - "Community 9"
Cohesion: 0.18
Nodes (8): HistoryMetrics(), InventoryFlowTrend(), KPICard(), KPICardProps, PaymentMetrics(), PickupMetrics(), ReservationFilters(), UserMetrics()

### Community 10 - "Community 10"
Cohesion: 0.14
Nodes (9): TransactionsTable(), transactions, ReceiptModalProps, PaymentStatus, PRODUCT_CATEGORIES, ProductCategory, StockStatus, TransactionItem (+1 more)

### Community 11 - "Community 11"
Cohesion: 0.21
Nodes (8): CartPage(), CheckoutPage(), useCart(), ProductDetailPage(), ProductCardProps, CartItem, CartState, useCartStore

### Community 12 - "Community 12"
Cohesion: 0.15
Nodes (12): ConfirmPickupModal(), ConfirmPickupModalProps, PickupItem, PickupOrder, PickupDetailsModal(), PickupDetailsModalProps, PickupItem, PickupOrder (+4 more)

### Community 13 - "Community 13"
Cohesion: 0.18
Nodes (7): InventoryUpdateTableProps, QuickStockModalProps, StaffKpiCards(), StaffKpiCardsProps, staffProducts, ProductCardProps, Product

### Community 14 - "Community 14"
Cohesion: 0.16
Nodes (10): PaymentItem, PaymentPickupList(), PaymentPickupListProps, PickupItem, Tab, VerifyPickupModal(), VerifyPickupModalProps, staffPayments (+2 more)

### Community 15 - "Community 15"
Cohesion: 0.19
Nodes (8): AdminTopbarProps, NAV_ITEMS, StaffSidebar(), StaffSidebarProps, ROUTE_TITLES, StaffTopbar(), StaffTopbarProps, ThemeToggle()

### Community 16 - "Community 16"
Cohesion: 0.20
Nodes (6): LiveTransactionFeed(), LiveTransactionFeedProps, StaffTransactionTable(), StaffTransactionTableProps, ReceiptModalProps, Transaction

### Community 17 - "Community 17"
Cohesion: 0.26
Nodes (6): AddStockModal(), AddStockModalProps, CATEGORIES, ProductForm, InventoryUpdateTable(), QuickStockModal()

### Community 18 - "Community 18"
Cohesion: 0.19
Nodes (9): AddUserModal(), AddUserModalProps, DeleteUserModal(), DeleteUserModalProps, EditUserModal(), EditUserModalProps, UserData, mockUsers (+1 more)

### Community 19 - "Community 19"
Cohesion: 0.24
Nodes (8): RecentOrdersTable(), TransactionTable(), useOrders(), ReservationsPage(), Order, OrderItem, OrdersState, useOrdersStore

### Community 20 - "Community 20"
Cohesion: 0.17
Nodes (4): AdminSidebar(), AdminSidebarProps, AdminTopbar(), UserTable()

### Community 21 - "Community 21"
Cohesion: 0.21
Nodes (7): BranchStockItem, BranchStockOverview(), BranchStockOverviewProps, STATUS_COLORS, SalesChart(), SalesChartProps, SalesTrendPointData

### Community 22 - "Community 22"
Cohesion: 0.17
Nodes (6): CatalogToolbar(), CategorySidebar(), DashboardMobileNav(), DashboardMobileNavProps, NearbyBranches(), SummaryCards()

### Community 23 - "Community 23"
Cohesion: 0.21
Nodes (7): InventoryStatusTable(), InventoryStatusTableProps, MonitoringMetrics(), MonitoringMetricsProps, InventoryStatusItem, MonitoringData, MonitoringMetricsData

### Community 24 - "Community 24"
Cohesion: 0.18
Nodes (10): BranchInventory, branchInventoryRelations, InsertBranchInventory, insertBranchInventorySchema, selectBranchInventorySchema, Branch, branches, InsertBranch (+2 more)

### Community 25 - "Community 25"
Cohesion: 0.17
Nodes (11): InsertOrder, InsertOrderItem, insertOrderItemSchema, insertOrderSchema, Order, OrderItem, orderItemsRelations, ordersRelations (+3 more)

### Community 26 - "Community 26"
Cohesion: 0.24
Nodes (9): formatCurrency(), getSalesData(), MONTH_NAMES, SalesFilterOptions, SalesOverview, SalesPageData, SalesTransactionRow, SalesTrendPoint (+1 more)

### Community 27 - "Community 27"
Cohesion: 0.20
Nodes (7): HistoryTable(), mockTransactions, Transaction, TransactionDetail, TransactionHistoryModal(), TransactionHistoryModalProps, TransactionItem

### Community 28 - "Community 28"
Cohesion: 0.22
Nodes (7): SalesMetrics(), SalesMetricsProps, TransactionDetailsTable(), TransactionDetailsTableProps, SalesApiData, SalesOverviewData, SalesTransactionRowData

### Community 29 - "Community 29"
Cohesion: 0.20
Nodes (10): Next.js App Service (Docker), Postgres Database Service (Docker), Adding components, Docker Support, Getting Started, Next.js template, Prerequisites, Seeding the Database (+2 more)

### Community 30 - "Community 30"
Cohesion: 0.31
Nodes (6): CatalogPage(), Pagination(), useProducts(), Product, ProductsState, useProductsStore

### Community 31 - "Community 31"
Cohesion: 0.40
Nodes (5): DashboardTopbar(), getInitials(), CustomerLayout(), CustomerPage(), useAuth()

### Community 32 - "Community 32"
Cohesion: 0.22
Nodes (6): PaymentDetailsModal(), PaymentDetailsModalProps, PaymentRecord, mockPayments, PaymentRecord, PaymentTable()

### Community 33 - "Community 33"
Cohesion: 0.31
Nodes (7): formatCurrency(), getMonitoringData(), RawBranch, RawInventory, RawProduct, RawTransaction, GET()

### Community 34 - "Community 34"
Cohesion: 0.28
Nodes (5): CashierSidebar(), CashierSidebarProps, NAV_ITEMS, CashierTopbar(), CashierTopbarProps

### Community 35 - "Community 35"
Cohesion: 0.22
Nodes (6): AdminNotificationsFeed(), badgeColorMap, borderColorMap, iconColorMap, mockNotifications, NotificationItem

### Community 36 - "Community 36"
Cohesion: 0.36
Nodes (4): PaymentSummaryCards(), PaymentsTable(), payments, Payment

### Community 38 - "Community 38"
Cohesion: 0.25
Nodes (5): CustomerNotificationItem, CustomerNotificationsFeed(), FilterTab, mockNotifications, tabs

### Community 39 - "Community 39"
Cohesion: 0.25
Nodes (4): ReservationMetrics(), mockReservations, Reservation, ReservationTable()

### Community 40 - "Community 40"
Cohesion: 0.25
Nodes (7): paymentMethodEnum, InsertTransaction, insertTransactionSchema, selectTransactionSchema, Transaction, transactionRelations, transactionStatusEnum

### Community 41 - "Community 41"
Cohesion: 0.29
Nodes (7): transactions, BRANCHES, CATEGORIES, envPath, generateId(), PRODUCTS, seedData()

### Community 42 - "Community 42"
Cohesion: 0.38
Nodes (4): ReservationCard(), ReservationCardProps, ReservationData, ReservationSummary()

### Community 43 - "Community 43"
Cohesion: 0.43
Nodes (4): useNotifications(), Notification, NotificationsState, useNotificationsStore

### Community 44 - "Community 44"
Cohesion: 0.40
Nodes (3): mockNotifications, StaffNotificationItem, StaffNotificationsFeed()

### Community 45 - "Community 45"
Cohesion: 0.47
Nodes (5): GET(), getUserIdFromToken(), POST(), orderItems, orders

### Community 46 - "Community 46"
Cohesion: 0.33
Nodes (5): InsertProduct, insertProductSchema, Product, productStockStatusEnum, selectProductSchema

### Community 48 - "Community 48"
Cohesion: 0.50
Nodes (3): BranchOption, SalesFilters(), SalesFiltersProps

### Community 50 - "Community 50"
Cohesion: 0.67
Nodes (3): SystemAlerts(), SystemAlertsProps, SystemAlertItem

### Community 52 - "Community 52"
Cohesion: 0.50
Nodes (3): Notification, NotificationCategory, NotificationSeverity

## Knowledge Gaps
- **211 isolated node(s):** `eslintConfig`, `config`, `pool`, `pool`, `pool` (+206 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ThemeToggle()` connect `Community 15` to `Community 31`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `useAuth()` connect `Community 31` to `Community 19`, `Community 43`, `Community 11`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Why does `AuthHeader()` connect `Community 1` to `Community 0`, `Community 3`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `verifyToken()` (e.g. with `PATCH()` and `GET()`) actually correct?**
  _`verifyToken()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `extractToken()` (e.g. with `PATCH()` and `GET()`) actually correct?**
  _`extractToken()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `eslintConfig`, `config`, `pool` to the rest of the system?**
  _217 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07811921510551648 - nodes in this community are weakly interconnected._