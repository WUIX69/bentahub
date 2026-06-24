# Graph Report - bentahub  (2026-06-24)

## Corpus Check
- 247 files · ~81,284 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 865 nodes · 1447 edges · 75 communities (57 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c896a3ea`
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

## God Nodes (most connected - your core abstractions)
1. `useAuth()` - 25 edges
2. `db` - 23 edges
3. `verifyToken()` - 22 edges
4. `extractToken()` - 22 edges
5. `generateId()` - 18 edges
6. `Product` - 16 edges
7. `users` - 13 edges
8. `useCart()` - 12 edges
9. `useOrders()` - 11 edges
10. `hashVerificationCode()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `seedProducts()` --calls--> `generateId()`  [EXTRACTED]
  scripts/seed-products.ts → src/lib/auth-utils.ts
- `ReservationsPage()` --calls--> `useOrders()`  [INFERRED]
  src/app/(dashboard)/customer/reservations/page.tsx → src/hooks/useOrders.ts
- `ProductCatalogProps` --references--> `Product`  [EXTRACTED]
  src/features/cashier-dashboard/components/product-catalog.tsx → src/types/cashier.ts
- `Contributing FSD Guidelines` --semantically_similar_to--> `FSD Isolation Principle Details`  [INFERRED] [semantically similar]
  docs/CONTRIBUTING.md → docs/FEATURE-SLICED-DESIGN.md
- `BentaHub` --references--> `BentaHub Developer Manual`  [EXTRACTED]
  README.md → docs/BENTAHUB.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **docs_bentahub_rbac_workflows** — docs_bentahub_admin_workflow, docs_bentahub_cashier_workflow, docs_bentahub_staff_workflow, docs_bentahub_customer_workflow [INFERRED 0.95]
- **docs_bentahub_system_constraints** — docs_bentahub_strict_payment_methods, docs_bentahub_no_delivery_architecture, docs_bentahub_role_based_security [INFERRED 0.95]

## Communities (75 total, 18 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (47): registerSchema, registerUser(), resendCodeSchema, resendVerificationCodeAction(), verifyEmailAction(), verifyEmailSchema, POST(), getVerificationEmailHtml() (+39 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (17): fontMono, fontSans, fontSerif, metadata, AuthHeader(), AuthContext, AuthContextValue, AuthProvider() (+9 more)

### Community 2 - "Community 2"
Cohesion: 0.20
Nodes (9): branchInventoryRelations, InsertBranchInventory, insertBranchInventorySchema, selectBranchInventorySchema, Branch, branches, InsertBranch, insertBranchSchema (+1 more)

### Community 3 - "Community 3"
Cohesion: 0.17
Nodes (11): InsertOrder, InsertOrderItem, insertOrderItemSchema, insertOrderSchema, Order, OrderItem, orderItemsRelations, ordersRelations (+3 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (17): AuthHeaderProps, branches, BranchGrid(), CtaBanner(), Footer(), HeroSection(), Navbar(), ProductGrid() (+9 more)

### Community 5 - "Community 5"
Cohesion: 0.07
Nodes (33): Admin Workflow, Cashier Workflow, Customer Workflow, BentaHub Developer Manual, Email Verification Codes Table Schema, Feature-Sliced Design Guidelines, FSD Structural Directory Mapping, JWT & Registration Verification Flow (+25 more)

### Community 6 - "Community 6"
Cohesion: 0.05
Nodes (42): formatCurrency(), RawBranch, RawInventory, RawProduct, RawTransaction, computeTrend(), formatCurrency(), getAdminOverview() (+34 more)

### Community 7 - "Community 7"
Cohesion: 0.13
Nodes (13): ProductActions(), ProductActionsProps, ProductBreadcrumb(), ProductBreadcrumbProps, ProductDetailsSection(), ProductDetailsSectionProps, ProductImageGallery(), ProductImageGalleryProps (+5 more)

### Community 8 - "Community 8"
Cohesion: 0.07
Nodes (28): 1. Tech Stack, 2. User Workflows & Permission Loops, 3. System Rules & Constraints, 4. Backend Implementation: Auth & User Management, 5. Customer Portal: Status & Implementation, 6. Architecture & Directory Guidelines, 👑 Admin Workflow (`src/app/admin/`), 🔌 API Route Specifications (+20 more)

### Community 9 - "Community 9"
Cohesion: 0.21
Nodes (11): CartItem(), CartItemProps, CartSidebar(), CartSidebarProps, CATEGORIES, ProductCatalog(), ProductCatalogProps, useCart() (+3 more)

### Community 10 - "Community 10"
Cohesion: 0.16
Nodes (10): HistoryMetrics(), InventoryFlowTrend(), KPICard(), KPICardProps, PickupMetrics(), ReservationFilters(), ReservationMetrics(), BranchOption (+2 more)

### Community 11 - "Community 11"
Cohesion: 0.14
Nodes (9): TransactionsTable(), transactions, ReceiptModalProps, PaymentStatus, PRODUCT_CATEGORIES, ProductCategory, StockStatus, TransactionItem (+1 more)

### Community 12 - "Community 12"
Cohesion: 0.21
Nodes (8): CartPage(), CheckoutPage(), useCart(), ProductDetailPage(), ProductCardProps, CartItem, CartState, useCartStore

### Community 13 - "Community 13"
Cohesion: 0.15
Nodes (7): InventoryUpdateTableProps, QuickStockModalProps, StaffKpiCards(), StaffKpiCardsProps, staffProducts, ProductCardProps, Product

### Community 14 - "Community 14"
Cohesion: 0.16
Nodes (10): PaymentItem, PaymentPickupList(), PaymentPickupListProps, PickupItem, Tab, VerifyPickupModal(), VerifyPickupModalProps, staffPayments (+2 more)

### Community 15 - "Community 15"
Cohesion: 0.29
Nodes (7): BRANCHES, envPath, generateId(), PRODUCTS, seedData(), BranchInventory, transactions

### Community 16 - "Community 16"
Cohesion: 0.16
Nodes (11): ConfirmPickupModal(), ConfirmPickupModalProps, PickupItem, PickupOrder, PickupDetailsModal(), PickupDetailsModalProps, PickupItem, PickupOrder (+3 more)

### Community 17 - "Community 17"
Cohesion: 0.20
Nodes (6): LiveTransactionFeed(), LiveTransactionFeedProps, StaffTransactionTable(), StaffTransactionTableProps, ReceiptModalProps, Transaction

### Community 18 - "Community 18"
Cohesion: 0.05
Nodes (41): 💻 Available Development Commands, BentaHub Contributing Guide, Core Folder Structure, Development Commands, 🏗️ Feature-Sliced Design (FSD) Guidelines, Contributing FSD Guidelines, 🛠️ Local Setup, Pull Request Quality Checklist (+33 more)

### Community 19 - "Community 19"
Cohesion: 0.23
Nodes (9): AddStockModal(), AddStockModalProps, CATEGORIES, ProductForm, InventoryUpdateTable(), QuickStockModal(), NAV_ITEMS, StaffSidebar() (+1 more)

### Community 20 - "Community 20"
Cohesion: 0.19
Nodes (9): AddUserModal(), AddUserModalProps, DeleteUserModal(), DeleteUserModalProps, EditUserModal(), EditUserModalProps, UserData, mockUsers (+1 more)

### Community 21 - "Community 21"
Cohesion: 0.20
Nodes (7): HistoryTable(), mockTransactions, Transaction, TransactionDetail, TransactionHistoryModal(), TransactionHistoryModalProps, TransactionItem

### Community 22 - "Community 22"
Cohesion: 0.18
Nodes (10): RecentOrdersTable(), TransactionTable(), ApiOrder, ApiOrderItem, useOrders(), ReservationsPage(), Order, OrderItem (+2 more)

### Community 23 - "Community 23"
Cohesion: 0.17
Nodes (6): CatalogToolbar(), DashboardMobileNav(), DashboardMobileNavProps, NearbyBranches(), SummaryCards(), TransactionFilters()

### Community 24 - "Community 24"
Cohesion: 0.10
Nodes (32): getMonitoringData(), formatCurrency(), getSalesData(), MONTH_NAMES, SalesFilterOptions, SalesOverview, SalesPageData, SalesTransactionRow (+24 more)

### Community 25 - "Community 25"
Cohesion: 0.18
Nodes (7): PaymentDetailsModal(), PaymentDetailsModalProps, PaymentRecord, PaymentMetrics(), mockPayments, PaymentRecord, PaymentTable()

### Community 27 - "Community 27"
Cohesion: 0.24
Nodes (7): CatalogPage(), CategorySidebar(), Pagination(), useProducts(), Product, ProductsState, useProductsStore

### Community 28 - "Community 28"
Cohesion: 0.25
Nodes (7): paymentMethodEnum, InsertTransaction, insertTransactionSchema, selectTransactionSchema, Transaction, transactionRelations, transactionStatusEnum

### Community 30 - "Community 30"
Cohesion: 0.29
Nodes (6): CartItem, cartItems, cartItemsRelations, InsertCartItem, insertCartItemSchema, selectCartItemSchema

### Community 32 - "Community 32"
Cohesion: 0.22
Nodes (6): AdminNotificationsFeed(), badgeColorMap, borderColorMap, iconColorMap, mockNotifications, NotificationItem

### Community 33 - "Community 33"
Cohesion: 0.36
Nodes (4): PaymentSummaryCards(), PaymentsTable(), payments, Payment

### Community 35 - "Community 35"
Cohesion: 0.25
Nodes (5): CustomerNotificationItem, CustomerNotificationsFeed(), FilterTab, mockNotifications, tabs

### Community 37 - "Community 37"
Cohesion: 0.38
Nodes (4): ReservationCard(), ReservationCardProps, ReservationData, ReservationSummary()

### Community 38 - "Community 38"
Cohesion: 0.29
Nodes (6): InsertNotification, insertNotificationSchema, Notification, notificationsRelations, notificationTypeEnum, selectNotificationSchema

### Community 39 - "Community 39"
Cohesion: 0.08
Nodes (27): AdminLayout(), AdminSidebar(), AdminSidebarProps, AdminTopbar(), AdminTopbarProps, DashboardSidebar(), DashboardSidebarProps, DashboardTopbar() (+19 more)

### Community 40 - "Community 40"
Cohesion: 0.40
Nodes (3): mockNotifications, StaffNotificationItem, StaffNotificationsFeed()

### Community 42 - "Community 42"
Cohesion: 0.20
Nodes (4): PickupTable(), mockReservations, Reservation, ReservationTable()

### Community 43 - "Community 43"
Cohesion: 0.33
Nodes (5): EmailVerificationCode, emailVerificationRelations, InsertEmailVerificationCode, insertEmailVerificationSchema, selectEmailVerificationSchema

### Community 45 - "Community 45"
Cohesion: 0.33
Nodes (5): InsertProduct, insertProductSchema, Product, productStockStatusEnum, selectProductSchema

### Community 46 - "Community 46"
Cohesion: 0.33
Nodes (5): InsertUser, insertUserSchema, selectUserSchema, User, userRoleEnum

### Community 47 - "Community 47"
Cohesion: 0.50
Nodes (3): Notification, NotificationCategory, NotificationSeverity

### Community 49 - "Community 49"
Cohesion: 0.50
Nodes (3): DATABASE_URL, Environment Variables Reference, JWT_SECRET

### Community 53 - "Community 53"
Cohesion: 0.18
Nodes (11): App structure, Architecture & FSD rules, Auth & security, BentaHub — Agent Instructions, Commands, Database, graphify, Known gotchas (+3 more)

### Community 66 - "Community 66"
Cohesion: 0.53
Nodes (4): base64urlToBytes(), verifyJwtEdge(), proxy(), PUBLIC_ROUTES

## Knowledge Gaps
- **276 isolated node(s):** `envPath`, `eslintConfig`, `config`, `pool`, `pool` (+271 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useAuth()` connect `Community 39` to `Community 12`, `Community 22`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._
- **Why does `users` connect `Community 0` to `Community 3`, `Community 38`, `Community 43`, `Community 46`, `Community 30`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `verifyToken()` (e.g. with `PATCH()` and `GET()`) actually correct?**
  _`verifyToken()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `extractToken()` (e.g. with `PATCH()` and `GET()`) actually correct?**
  _`extractToken()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `envPath`, `eslintConfig`, `config` to the rest of the system?**
  _279 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07259407259407259 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06039488966318235 - nodes in this community are weakly interconnected._