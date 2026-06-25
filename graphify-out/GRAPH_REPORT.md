# Graph Report - .  (2026-06-25)

## Corpus Check
- 155 files · ~94,184 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 862 nodes · 1365 edges · 82 communities (62 shown, 20 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 18 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Live Monitoring|Live Monitoring]]
- [[_COMMUNITY_Live Monitoring|Live Monitoring]]
- [[_COMMUNITY_Navigation Components|Navigation Components]]
- [[_COMMUNITY_Navigation Components|Navigation Components]]
- [[_COMMUNITY_Inventory Management|Inventory Management]]
- [[_COMMUNITY_User Authentication|User Authentication]]
- [[_COMMUNITY_Inventory Management|Inventory Management]]
- [[_COMMUNITY_Payment Processing|Payment Processing]]
- [[_COMMUNITY_Dashboard Overview|Dashboard Overview]]
- [[_COMMUNITY_Notification Services|Notification Services]]
- [[_COMMUNITY_Navigation Components|Navigation Components]]
- [[_COMMUNITY_Inventory Management|Inventory Management]]
- [[_COMMUNITY_Navigation Components|Navigation Components]]
- [[_COMMUNITY_User Authentication|User Authentication]]
- [[_COMMUNITY_Navigation Components|Navigation Components]]
- [[_COMMUNITY_Navigation Components|Navigation Components]]
- [[_COMMUNITY_Order Pickups|Order Pickups]]
- [[_COMMUNITY_Live Monitoring|Live Monitoring]]
- [[_COMMUNITY_Payment Processing|Payment Processing]]
- [[_COMMUNITY_Stock Reservations|Stock Reservations]]
- [[_COMMUNITY_Inventory Management|Inventory Management]]
- [[_COMMUNITY_Payment Processing|Payment Processing]]
- [[_COMMUNITY_Database Schema|Database Schema]]
- [[_COMMUNITY_User Authentication|User Authentication]]
- [[_COMMUNITY_User & Role Management|User & Role Management]]
- [[_COMMUNITY_Branch Management|Branch Management]]
- [[_COMMUNITY_Shopping Cart & Checkout|Shopping Cart & Checkout]]
- [[_COMMUNITY_Inventory Management|Inventory Management]]
- [[_COMMUNITY_Components Modules|Components Modules]]
- [[_COMMUNITY_Scripts Modules|Scripts Modules]]
- [[_COMMUNITY_Navigation Components|Navigation Components]]
- [[_COMMUNITY_Components Modules|Components Modules]]
- [[_COMMUNITY_Db Modules|Db Modules]]
- [[_COMMUNITY_Docs Modules|Docs Modules]]
- [[_COMMUNITY_Payment Processing|Payment Processing]]
- [[_COMMUNITY_Payment Processing|Payment Processing]]
- [[_COMMUNITY_Notification Services|Notification Services]]
- [[_COMMUNITY_Product Catalog|Product Catalog]]
- [[_COMMUNITY_Notification Services|Notification Services]]
- [[_COMMUNITY_Branch Management|Branch Management]]
- [[_COMMUNITY_Notification Services|Notification Services]]
- [[_COMMUNITY_User Authentication|User Authentication]]
- [[_COMMUNITY_Database Schema|Database Schema]]
- [[_COMMUNITY_Inventory Management|Inventory Management]]
- [[_COMMUNITY_User & Role Management|User & Role Management]]
- [[_COMMUNITY_Navigation Components|Navigation Components]]
- [[_COMMUNITY_Sales & Revenue Analytics|Sales & Revenue Analytics]]
- [[_COMMUNITY_Navigation Components|Navigation Components]]
- [[_COMMUNITY_Inventory Management|Inventory Management]]
- [[_COMMUNITY_Notification Services|Notification Services]]
- [[_COMMUNITY_User Authentication|User Authentication]]
- [[_COMMUNITY_User Authentication|User Authentication]]
- [[_COMMUNITY_Notification Services|Notification Services]]
- [[_COMMUNITY_Components Modules|Components Modules]]
- [[_COMMUNITY_Docker Modules|Docker Modules]]
- [[_COMMUNITY_Docs Modules|Docs Modules]]
- [[_COMMUNITY_Scripts Modules|Scripts Modules]]
- [[_COMMUNITY_Scripts Modules|Scripts Modules]]
- [[_COMMUNITY_Product Catalog|Product Catalog]]
- [[_COMMUNITY_Scripts Modules|Scripts Modules]]
- [[_COMMUNITY_Database Schema|Database Schema]]
- [[_COMMUNITY_Eslint Modules|Eslint Modules]]
- [[_COMMUNITY_Postcss Modules|Postcss Modules]]
- [[_COMMUNITY_Agents Modules|Agents Modules]]
- [[_COMMUNITY_Docs Modules|Docs Modules]]
- [[_COMMUNITY_Docs Modules|Docs Modules]]
- [[_COMMUNITY_Docs Modules|Docs Modules]]
- [[_COMMUNITY_Database Schema|Database Schema]]

## God Nodes (most connected - your core abstractions)
1. `useAuth()` - 25 edges
2. `db` - 25 edges
3. `verifyToken()` - 22 edges
4. `extractToken()` - 22 edges
5. `generateId()` - 18 edges
6. `Product` - 14 edges
7. `users` - 14 edges
8. `Transaction` - 11 edges
9. `hashVerificationCode()` - 11 edges
10. `AuthResponse` - 10 edges

## Surprising Connections (you probably didn't know these)
- `seedProducts()` --calls--> `generateId()`  [EXTRACTED]
  scripts/seed-products.ts → src/lib/auth-utils.ts
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
- **User Role Permission Workflows** — docs_bentahub_admin_workflow, docs_bentahub_employee_workflow, docs_bentahub_customer_workflow [EXTRACTED 1.00]
- **Feature-Sliced Design Isolation and Promotion Rules** — docs_feature_sliced_design_rule_of_promotion, docs_feature_sliced_design_import_boundary_rules, docs_contributing_isolation_principle [INFERRED 0.95]
- **BentaHub Core Documentation System** — docs_bentahub_document, docs_feature_sliced_design_document, docs_contributing_document, docs_runbook_document [EXTRACTED 1.00]

## Communities (82 total, 20 thin omitted)

### Community 0 - "Live Monitoring"
Cohesion: 0.06
Nodes (66): formatCurrency(), getMonitoringData(), RawBranch, RawInventory, RawProduct, RawTransaction, registerSchema, registerUser() (+58 more)

### Community 1 - "Live Monitoring"
Cohesion: 0.06
Nodes (37): computeTrend(), formatCurrency(), getAdminOverview(), getMonthRange(), MONTH_NAMES, RawBranch, RawInventory, RawTransaction (+29 more)

### Community 2 - "Navigation Components"
Cohesion: 0.06
Nodes (25): DashboardMobileNav(), DashboardMobileNavProps, DashboardSidebar(), DashboardSidebarProps, DashboardTopbar(), getInitials(), EmployeeSidebarProps, NAV_ITEMS (+17 more)

### Community 3 - "Navigation Components"
Cohesion: 0.07
Nodes (20): AuthHeader(), AuthHeaderProps, CreateNewPasswordForm(), ForgotPasswordForm(), RegisterForm(), ResetPasswordForm(), VerifyEmailForm(), APP_NAME (+12 more)

### Community 4 - "Inventory Management"
Cohesion: 0.16
Nodes (11): InventoryUpdateTableProps, QuickStockModalProps, StaffKpiCards(), StaffKpiCardsProps, StockSummaryCards(), StockTable(), allProducts, getStockStatus() (+3 more)

### Community 5 - "User Authentication"
Cohesion: 0.09
Nodes (11): fontMono, fontSans, fontSerif, metadata, AuthContext, AuthContextValue, AuthProvider(), AuthProviderProps (+3 more)

### Community 6 - "Inventory Management"
Cohesion: 0.13
Nodes (16): AddStockModal(), AddStockModalProps, CATEGORIES, ProductForm, InventoryUpdateTable(), PaymentItem, PaymentPickupList(), PaymentPickupListProps (+8 more)

### Community 7 - "Payment Processing"
Cohesion: 0.10
Nodes (12): LiveTransactionFeed(), LiveTransactionFeedProps, StaffTransactionTable(), StaffTransactionTableProps, allTransactions, staffPayments, staffPickups, GetTransactionsParams (+4 more)

### Community 8 - "Dashboard Overview"
Cohesion: 0.12
Nodes (15): formatCurrency(), getSalesData(), MONTH_NAMES, SalesFilterOptions, SalesOverview, SalesPageData, SalesTransactionRow, SalesTrendPoint (+7 more)

### Community 9 - "Notification Services"
Cohesion: 0.12
Nodes (10): MarkReadParams, MarkReadResult, FilterTab, NotificationItem, NotificationsFeed(), roleLabels, roleToBuilder, GetNotificationsParams (+2 more)

### Community 10 - "Navigation Components"
Cohesion: 0.11
Nodes (10): branches, BranchGrid(), CtaBanner(), Footer(), HeroSection(), Navbar(), ProductGrid(), products (+2 more)

### Community 11 - "Inventory Management"
Cohesion: 0.14
Nodes (11): HistoryMetrics(), InventoryFlowTrend(), KPICard(), KPICardProps, PaymentMetrics(), PickupMetrics(), ReservationFilters(), ReservationMetrics() (+3 more)

### Community 12 - "Navigation Components"
Cohesion: 0.13
Nodes (13): ProductActions(), ProductActionsProps, ProductBreadcrumb(), ProductBreadcrumbProps, ProductDetailsSection(), ProductDetailsSectionProps, ProductImageGallery(), ProductImageGalleryProps (+5 more)

### Community 13 - "User Authentication"
Cohesion: 0.17
Nodes (11): CheckoutPage(), demoOrders, RecentOrdersTable(), TransactionTable(), ApiOrder, ApiOrderItem, useOrders(), Order (+3 more)

### Community 14 - "Navigation Components"
Cohesion: 0.21
Nodes (11): CartItem(), CartItemProps, CartSidebar(), CartSidebarProps, CATEGORIES, ProductCatalog(), ProductCatalogProps, useCart() (+3 more)

### Community 15 - "Navigation Components"
Cohesion: 0.16
Nodes (9): CatalogPage(), demoProducts, CatalogToolbar(), CategorySidebar(), Pagination(), useProducts(), Product, ProductsState (+1 more)

### Community 16 - "Order Pickups"
Cohesion: 0.15
Nodes (12): ConfirmPickupModal(), ConfirmPickupModalProps, PickupItem, PickupOrder, PickupDetailsModal(), PickupDetailsModalProps, PickupItem, PickupOrder (+4 more)

### Community 17 - "Live Monitoring"
Cohesion: 0.17
Nodes (10): AlertItem, InventoryRow, LiveTransaction, mockAlerts, mockBranches, mockInventory, mockLiveTransactions, MonitoringDashboard() (+2 more)

### Community 18 - "Payment Processing"
Cohesion: 0.14
Nodes (9): mockPayments, mockPickups, PaymentItem, PickupItem, PickupsManager(), Tab, GetPickupsParams, GetPickupsResult (+1 more)

### Community 19 - "Stock Reservations"
Cohesion: 0.14
Nodes (9): CustomerTab, mockReservations, ReservationData, ReservationsManager(), statusLabels, statusStyles, GetReservationsParams, GetReservationsResult (+1 more)

### Community 20 - "Inventory Management"
Cohesion: 0.18
Nodes (8): payments, Payment, PaymentStatus, PRODUCT_CATEGORIES, ProductCategory, StockStatus, TransactionItem, TransactionStatus

### Community 21 - "Payment Processing"
Cohesion: 0.15
Nodes (8): mockPayments, PaymentItem, PaymentMethod, PaymentsManager(), PaymentStatus, GetPaymentsParams, GetPaymentsResult, PaymentRecord

### Community 22 - "Database Schema"
Cohesion: 0.14
Nodes (13): InsertOrder, InsertOrderItem, insertOrderItemSchema, insertOrderSchema, Order, OrderItem, orderItems, orderItemsRelations (+5 more)

### Community 23 - "User Authentication"
Cohesion: 0.21
Nodes (7): CartPage(), useCart(), ProductDetailPage(), ProductCardProps, CartItem, CartState, useCartStore

### Community 24 - "User & Role Management"
Cohesion: 0.18
Nodes (9): AddUserModal(), AddUserModalProps, DeleteUserModal(), DeleteUserModalProps, EditUserModal(), EditUserModalProps, UserData, mockUsers (+1 more)

### Community 25 - "Branch Management"
Cohesion: 0.15
Nodes (4): NearbyBranches(), ReservationCardProps, ReservationData, SummaryCards()

### Community 26 - "Shopping Cart & Checkout"
Cohesion: 0.17
Nodes (10): CartItem, cartItemsRelations, InsertCartItem, insertCartItemSchema, selectCartItemSchema, InsertUser, insertUserSchema, selectUserSchema (+2 more)

### Community 27 - "Inventory Management"
Cohesion: 0.18
Nodes (10): branchInventory, branchInventoryRelations, InsertBranchInventory, insertBranchInventorySchema, selectBranchInventorySchema, Branch, branches, InsertBranch (+2 more)

### Community 28 - "Components Modules"
Cohesion: 0.20
Nodes (4): customerOrders, employeeTransactions, MockTransaction, TransactionsList()

### Community 29 - "Scripts Modules"
Cohesion: 0.20
Nodes (6): contributingPath, docsDir, envExamplePath, envMdPath, packageJsonPath, projectRoot

### Community 30 - "Navigation Components"
Cohesion: 0.22
Nodes (4): AdminSidebar(), AdminSidebarProps, AdminTopbar(), AdminTopbarProps

### Community 31 - "Components Modules"
Cohesion: 0.25
Nodes (6): mockTransactions, Transaction, TransactionDetail, TransactionHistoryModal(), TransactionHistoryModalProps, TransactionItem

### Community 32 - "Db Modules"
Cohesion: 0.25
Nodes (3): SettingsPanel(), GetSettingsParams, SettingsData

### Community 34 - "Payment Processing"
Cohesion: 0.29
Nodes (6): PaymentDetailsModal(), PaymentDetailsModalProps, PaymentRecord, mockPayments, PaymentRecord, PaymentTable()

### Community 35 - "Payment Processing"
Cohesion: 0.25
Nodes (7): paymentMethodEnum, InsertTransaction, insertTransactionSchema, selectTransactionSchema, Transaction, transactionRelations, transactionStatusEnum

### Community 36 - "Notification Services"
Cohesion: 0.29
Nodes (6): AdminNotificationsFeed(), badgeColorMap, borderColorMap, iconColorMap, mockNotifications, NotificationItem

### Community 37 - "Product Catalog"
Cohesion: 0.33
Nodes (6): BRANCHES, envPath, generateId(), PRODUCTS, seedData(), USERS

### Community 38 - "Notification Services"
Cohesion: 0.29
Nodes (6): InsertNotification, insertNotificationSchema, Notification, notificationsRelations, notificationTypeEnum, selectNotificationSchema

### Community 39 - "Branch Management"
Cohesion: 0.33
Nodes (6): Branch Locking Constraint, No Delivery Architecture, Strict Payment Methods, User Roles, Customer Workflow, Employee Workflow

### Community 40 - "Notification Services"
Cohesion: 0.33
Nodes (4): CustomerNotificationItem, FilterTab, mockNotifications, tabs

### Community 41 - "User Authentication"
Cohesion: 0.53
Nodes (4): base64urlToBytes(), verifyJwtEdge(), proxy(), PUBLIC_ROUTES

### Community 42 - "Database Schema"
Cohesion: 0.33
Nodes (5): EmailVerificationCode, emailVerificationRelations, InsertEmailVerificationCode, insertEmailVerificationSchema, selectEmailVerificationSchema

### Community 43 - "Inventory Management"
Cohesion: 0.33
Nodes (5): InsertProduct, insertProductSchema, Product, productStockStatusEnum, selectProductSchema

### Community 46 - "Sales & Revenue Analytics"
Cohesion: 0.50
Nodes (3): BranchOption, SalesFilters(), SalesFiltersProps

### Community 49 - "Notification Services"
Cohesion: 0.50
Nodes (3): Notification, NotificationCategory, NotificationSeverity

### Community 50 - "User Authentication"
Cohesion: 0.67
Nodes (3): Unwired Middleware Proxy, Authentication Mechanism, Email Verification Flow

### Community 54 - "Docker Modules"
Cohesion: 0.67
Nodes (3): Adminer DB Client Service, PostgreSQL DB Service, Database Seeding & Reset

### Community 55 - "Docs Modules"
Cohesion: 0.67
Nodes (3): FSD Isolation Principle, Import Boundary Rules, Rule of Promotion

## Knowledge Gaps
- **272 isolated node(s):** `eslintConfig`, `config`, `pool`, `pool`, `setup-db.sh script` (+267 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useAuth()` connect `Navigation Components` to `Db Modules`, `Dashboard Overview`, `Notification Services`, `User Authentication`, `Live Monitoring`, `Payment Processing`, `Stock Reservations`, `Payment Processing`, `User Authentication`, `Components Modules`, `Navigation Components`?**
  _High betweenness centrality (0.419) - this node is a cross-community bridge._
- **Why does `Transaction` connect `Payment Processing` to `Components Modules`, `Inventory Management`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Why does `db` connect `Live Monitoring` to `Dashboard Overview`, `Live Monitoring`, `Product Catalog`, `Live Monitoring`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `verifyToken()` (e.g. with `PATCH()` and `GET()`) actually correct?**
  _`verifyToken()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `extractToken()` (e.g. with `PATCH()` and `GET()`) actually correct?**
  _`extractToken()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `eslintConfig`, `config`, `pool` to the rest of the system?**
  _278 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Live Monitoring` be split into smaller, more focused modules?**
  _Cohesion score 0.060781786941580755 - nodes in this community are weakly interconnected._