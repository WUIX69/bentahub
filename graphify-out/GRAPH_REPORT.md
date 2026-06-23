# Graph Report - src  (2026-06-23)

## Corpus Check
- 218 files · ~64,233 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 701 nodes · 1355 edges · 48 communities (41 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Admin Monitoring API|Admin Monitoring API]]
- [[_COMMUNITY_Admin Overview Metrics|Admin Overview Metrics]]
- [[_COMMUNITY_User Settings & Passwords|User Settings & Passwords]]
- [[_COMMUNITY_User Authentication Flow|User Authentication Flow]]
- [[_COMMUNITY_Branch Inventory Schema|Branch Inventory Schema]]
- [[_COMMUNITY_Landing Page Grid|Landing Page Grid]]
- [[_COMMUNITY_Database Cart Schema|Database Cart Schema]]
- [[_COMMUNITY_Product Catalog Layout|Product Catalog Layout]]
- [[_COMMUNITY_Quick Stock Modal|Quick Stock Modal]]
- [[_COMMUNITY_Application Layout Setup|Application Layout Setup]]
- [[_COMMUNITY_Recent Orders UI|Recent Orders UI]]
- [[_COMMUNITY_Stock Form Component|Stock Form Component]]
- [[_COMMUNITY_Customer Dashboard Topbar|Customer Dashboard Topbar]]
- [[_COMMUNITY_Staff Monitoring UI|Staff Monitoring UI]]
- [[_COMMUNITY_Transactions List UI|Transactions List UI]]
- [[_COMMUNITY_Cashier Page Cart|Cashier Page Cart]]
- [[_COMMUNITY_Customer Checkout|Customer Checkout]]
- [[_COMMUNITY_Staff Sidebar Menu|Staff Sidebar Menu]]
- [[_COMMUNITY_Confirm Pickup Modal|Confirm Pickup Modal]]
- [[_COMMUNITY_Inventory Trend Metrics|Inventory Trend Metrics]]
- [[_COMMUNITY_Admin Notifications Feed|Admin Notifications Feed]]
- [[_COMMUNITY_User Management Modals|User Management Modals]]
- [[_COMMUNITY_Product Category Sidebar|Product Category Sidebar]]
- [[_COMMUNITY_Admin History Table|Admin History Table]]
- [[_COMMUNITY_Admin Payments View|Admin Payments View]]
- [[_COMMUNITY_Cashier Payments View|Cashier Payments View]]
- [[_COMMUNITY_Cashier Layout Sidebar|Cashier Layout Sidebar]]
- [[_COMMUNITY_Cashier Stock View|Cashier Stock View]]
- [[_COMMUNITY_Admin Reservations Table|Admin Reservations Table]]
- [[_COMMUNITY_Customer Notification Feed|Customer Notification Feed]]
- [[_COMMUNITY_Notification Stores & Hooks|Notification Stores & Hooks]]
- [[_COMMUNITY_Admin Layout Sidebar|Admin Layout Sidebar]]
- [[_COMMUNITY_Staff Notification Feed|Staff Notification Feed]]
- [[_COMMUNITY_Cashier Notification Feed|Cashier Notification Feed]]
- [[_COMMUNITY_Admin Pickups Table|Admin Pickups Table]]
- [[_COMMUNITY_Sales Charts Filters|Sales Charts Filters]]
- [[_COMMUNITY_Admin Inventory Table|Admin Inventory Table]]
- [[_COMMUNITY_Notification Types|Notification Types]]
- [[_COMMUNITY_Auth Layout Configuration|Auth Layout Configuration]]
- [[_COMMUNITY_Mobile Nav Layout|Mobile Nav Layout]]
- [[_COMMUNITY_Email Code Schema|Email Code Schema]]

## God Nodes (most connected - your core abstractions)
1. `verifyToken()` - 22 edges
2. `extractToken()` - 22 edges
3. `Button()` - 21 edges
4. `db` - 21 edges
5. `generateId()` - 16 edges
6. `Product` - 16 edges
7. `useAuth()` - 13 edges
8. `users` - 13 edges
9. `useCart()` - 12 edges
10. `useOrders()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `ReservationsPage()` --calls--> `useOrders()`  [INFERRED]
  app/customer/reservations/page.tsx → hooks/useOrders.ts
- `ProductCatalogProps` --references--> `Product`  [EXTRACTED]
  features/cashier-dashboard/components/product-catalog.tsx → types/cashier.ts
- `LoginPage()` --calls--> `useAuth()`  [EXTRACTED]
  app/(auth)/login/page.tsx → components/auth-provider.tsx
- `GET()` --calls--> `getMonitoringData()`  [INFERRED]
  app/api/admin/notifications/route.ts → features/admin-dashboard/actions/get-monitoring.ts
- `GET()` --calls--> `extractToken()`  [INFERRED]
  app/api/admin/notifications/route.ts → lib/auth-utils.ts

## Import Cycles
- None detected.

## Communities (48 total, 7 thin omitted)

### Community 0 - "Admin Monitoring API"
Cohesion: 0.07
Nodes (49): formatCurrency(), getMonitoringData(), RawBranch, RawInventory, RawProduct, RawTransaction, formatCurrency(), getSalesData() (+41 more)

### Community 1 - "Admin Overview Metrics"
Cohesion: 0.06
Nodes (36): computeTrend(), formatCurrency(), getAdminOverview(), getMonthRange(), MONTH_NAMES, RawBranch, RawInventory, RawTransaction (+28 more)

### Community 2 - "User Settings & Passwords"
Cohesion: 0.12
Nodes (16): AuthHeader(), useAuth(), CreateNewPasswordForm(), ForgotPasswordForm(), RegisterForm(), ResetPasswordForm(), VerifyEmailForm(), LoginPage() (+8 more)

### Community 3 - "User Authentication Flow"
Cohesion: 0.13
Nodes (31): registerSchema, registerUser(), resendCodeSchema, resendVerificationCodeAction(), verifyEmailAction(), verifyEmailSchema, getVerificationEmailHtml(), POST() (+23 more)

### Community 4 - "Branch Inventory Schema"
Cohesion: 0.05
Nodes (36): BranchInventory, branchInventoryRelations, InsertBranchInventory, insertBranchInventorySchema, selectBranchInventorySchema, Branch, branches, InsertBranch (+28 more)

### Community 5 - "Landing Page Grid"
Cohesion: 0.08
Nodes (19): AuthHeaderProps, branches, BranchGrid(), CtaBanner(), DashboardSidebar(), DashboardSidebarProps, Footer(), HeroSection() (+11 more)

### Community 6 - "Database Cart Schema"
Cohesion: 0.08
Nodes (21): CartItem, cartItemsRelations, InsertCartItem, insertCartItemSchema, selectCartItemSchema, EmailVerificationCode, emailVerificationRelations, InsertEmailVerificationCode (+13 more)

### Community 7 - "Product Catalog Layout"
Cohesion: 0.13
Nodes (14): CatalogToolbar(), ProductActions(), ProductActionsProps, ProductBreadcrumb(), ProductBreadcrumbProps, ProductDetailsSection(), ProductDetailsSectionProps, ProductImageGallery() (+6 more)

### Community 8 - "Quick Stock Modal"
Cohesion: 0.14
Nodes (9): InventoryUpdateTable(), InventoryUpdateTableProps, QuickStockModal(), QuickStockModalProps, StaffKpiCards(), StaffKpiCardsProps, staffProducts, ProductCardProps (+1 more)

### Community 9 - "Application Layout Setup"
Cohesion: 0.11
Nodes (10): fontMono, fontSans, fontSerif, metadata, AuthContext, AuthContextValue, AuthProvider(), AuthProviderProps (+2 more)

### Community 10 - "Recent Orders UI"
Cohesion: 0.17
Nodes (12): ReservationsPage(), RecentOrdersTable(), ReservationCard(), ReservationCardProps, ReservationData, ReservationSummary(), TransactionTable(), useOrders() (+4 more)

### Community 11 - "Stock Form Component"
Cohesion: 0.15
Nodes (12): AddStockModal(), AddStockModalProps, CATEGORIES, ProductForm, PaymentItem, PaymentPickupList(), PaymentPickupListProps, PickupItem (+4 more)

### Community 12 - "Customer Dashboard Topbar"
Cohesion: 0.18
Nodes (8): DashboardTopbar(), getInitials(), NearbyBranches(), SummaryCards(), TransactionFilters(), CustomerLayout(), CustomerPage(), useAuth()

### Community 13 - "Staff Monitoring UI"
Cohesion: 0.17
Nodes (8): LiveTransactionFeed(), LiveTransactionFeedProps, StaffTransactionTable(), StaffTransactionTableProps, staffPickups, staffTransactions, ReceiptModalProps, Transaction

### Community 14 - "Transactions List UI"
Cohesion: 0.14
Nodes (9): TransactionsTable(), transactions, ReceiptModalProps, PaymentStatus, PRODUCT_CATEGORIES, ProductCategory, StockStatus, TransactionItem (+1 more)

### Community 15 - "Cashier Page Cart"
Cohesion: 0.21
Nodes (11): CashierPage(), CartItem(), CartItemProps, CartSidebar(), CartSidebarProps, CATEGORIES, ProductCatalog(), ProductCatalogProps (+3 more)

### Community 16 - "Customer Checkout"
Cohesion: 0.21
Nodes (8): CartPage(), CheckoutPage(), ProductCardProps, useCart(), ProductDetailPage(), CartItem, CartState, useCartStore

### Community 17 - "Staff Sidebar Menu"
Cohesion: 0.19
Nodes (8): AdminTopbarProps, NAV_ITEMS, StaffSidebar(), StaffSidebarProps, ROUTE_TITLES, StaffTopbar(), StaffTopbarProps, ThemeToggle()

### Community 18 - "Confirm Pickup Modal"
Cohesion: 0.16
Nodes (11): ConfirmPickupModal(), ConfirmPickupModalProps, PickupItem, PickupOrder, PickupDetailsModal(), PickupDetailsModalProps, PickupItem, PickupOrder (+3 more)

### Community 19 - "Inventory Trend Metrics"
Cohesion: 0.21
Nodes (7): HistoryMetrics(), InventoryFlowTrend(), KPICard(), KPICardProps, PaymentMetrics(), ReservationMetrics(), UserMetrics()

### Community 20 - "Admin Notifications Feed"
Cohesion: 0.15
Nodes (7): AdminNotificationsFeed(), badgeColorMap, borderColorMap, iconColorMap, mockNotifications, NotificationItem, UserTable()

### Community 21 - "User Management Modals"
Cohesion: 0.19
Nodes (9): AddUserModal(), AddUserModalProps, DeleteUserModal(), DeleteUserModalProps, EditUserModal(), EditUserModalProps, UserData, mockUsers (+1 more)

### Community 22 - "Product Category Sidebar"
Cohesion: 0.24
Nodes (7): CatalogPage(), CategorySidebar(), Pagination(), useProducts(), Product, ProductsState, useProductsStore

### Community 23 - "Admin History Table"
Cohesion: 0.20
Nodes (7): HistoryTable(), mockTransactions, Transaction, TransactionDetail, TransactionHistoryModal(), TransactionHistoryModalProps, TransactionItem

### Community 24 - "Admin Payments View"
Cohesion: 0.22
Nodes (6): PaymentDetailsModal(), PaymentDetailsModalProps, PaymentRecord, mockPayments, PaymentRecord, PaymentTable()

### Community 25 - "Cashier Payments View"
Cohesion: 0.36
Nodes (4): PaymentSummaryCards(), PaymentsTable(), payments, Payment

### Community 26 - "Cashier Layout Sidebar"
Cohesion: 0.28
Nodes (5): CashierSidebar(), CashierSidebarProps, NAV_ITEMS, CashierTopbar(), CashierTopbarProps

### Community 28 - "Admin Reservations Table"
Cohesion: 0.25
Nodes (4): ReservationFilters(), mockReservations, Reservation, ReservationTable()

### Community 29 - "Customer Notification Feed"
Cohesion: 0.25
Nodes (5): CustomerNotificationItem, CustomerNotificationsFeed(), FilterTab, mockNotifications, tabs

### Community 30 - "Notification Stores & Hooks"
Cohesion: 0.43
Nodes (4): useNotifications(), Notification, NotificationsState, useNotificationsStore

### Community 31 - "Admin Layout Sidebar"
Cohesion: 0.33
Nodes (3): AdminSidebar(), AdminSidebarProps, AdminTopbar()

### Community 32 - "Staff Notification Feed"
Cohesion: 0.40
Nodes (3): mockNotifications, StaffNotificationItem, StaffNotificationsFeed()

### Community 35 - "Sales Charts Filters"
Cohesion: 0.50
Nodes (3): BranchOption, SalesFilters(), SalesFiltersProps

### Community 37 - "Notification Types"
Cohesion: 0.50
Nodes (3): Notification, NotificationCategory, NotificationSeverity

## Knowledge Gaps
- **184 isolated node(s):** `metadata`, `metadata`, `registerSchema`, `verifyEmailSchema`, `resendCodeSchema` (+179 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Button()` connect `User Settings & Passwords` to `Landing Page Grid`, `Product Catalog Layout`, `Recent Orders UI`, `Customer Checkout`, `Staff Sidebar Menu`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Why does `ThemeToggle()` connect `Staff Sidebar Menu` to `Customer Dashboard Topbar`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Why does `Input()` connect `User Settings & Passwords` to `Staff Sidebar Menu`, `Customer Dashboard Topbar`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `verifyToken()` (e.g. with `GET()` and `PATCH()`) actually correct?**
  _`verifyToken()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `extractToken()` (e.g. with `GET()` and `PATCH()`) actually correct?**
  _`extractToken()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `metadata`, `metadata`, `registerSchema` to the rest of the system?**
  _184 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Admin Monitoring API` be split into smaller, more focused modules?**
  _Cohesion score 0.06659056316590563 - nodes in this community are weakly interconnected._