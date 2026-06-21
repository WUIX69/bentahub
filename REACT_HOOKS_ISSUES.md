# React Hooks Issues - Infinite Loop & Re-render Risks

## Summary
Found **15 problematic patterns** across the src folder that could cause infinite loops or excessive re-rendering.

---

## Critical Issues (High Priority)

### 1. setTimeout without cleanup in handleSubmitOrder
**File:** [src/app/customer/checkout/page.tsx](src/app/customer/checkout/page.tsx#L46-L51)  
**Lines:** 46-51  
**Issue:** Nested setTimeout calls without cleanup. If component unmounts during the timeout, state updates will occur on unmounted component.  
**Severity:** HIGH - Can cause memory leaks and warnings

```typescript
// PROBLEMATIC CODE
setTimeout(() => {
  clearCart()
  setTimeout(() => {
    router.push("/customer/transactions")
  }, 1500)
}, 2000)
```

**Fix:** Wrap in useEffect with cleanup
```typescript
useEffect(() => {
  if (orderSuccess) {
    const timer1 = setTimeout(() => {
      clearCart()
      const timer2 = setTimeout(() => {
        router.push("/customer/transactions")
      }, 1500)
      return () => clearTimeout(timer2)
    }, 2000)
    return () => clearTimeout(timer1)
  }
}, [orderSuccess])
```

---

### 2. setTimeout without cleanup in completeSale callback
**File:** [src/features/cashier-dashboard/components/cart-sidebar.tsx](src/features/cashier-dashboard/components/cart-sidebar.tsx#L51)  
**Lines:** 51-54  
**Issue:** setTimeout in useCallback without cleanup. Timeout persists if component unmounts.  
**Severity:** HIGH

```typescript
// PROBLEMATIC CODE
setTimeout(() => {
  setCheckoutSuccess(false)
}, 4000)
```

---

### 3. setTimeout without cleanup in verify-email redirect
**File:** [src/app/(auth)/verify-email/page.tsx](src/app/(auth)/verify-email/page.tsx#L79-L82)  
**Lines:** 79-82  
**Issue:** setTimeout for redirect without cleanup on unmount.  
**Severity:** HIGH

```typescript
// PROBLEMATIC CODE (line 79)
setTimeout(() => {
  sessionStorage.removeItem("pendingVerificationEmail")
  router.push("/customer")
}, 2000)
```

---

### 4. setTimeout without cleanup in reset-password-form
**File:** [src/features/user-mgmt/components/reset-password-form.tsx](src/features/user-mgmt/components/reset-password-form.tsx#L65-L67)  
**Lines:** 65-67  
**Issue:** setTimeout for redirect without cleanup.  
**Severity:** HIGH

```typescript
// PROBLEMATIC CODE
setTimeout(() => {
  router.push(`/create-new-password?token=${token}&email=${encodeURIComponent(email)}`)
}, 1500)
```

---

### 5. setTimeout without cleanup in create-new-password-form
**File:** [src/features/user-mgmt/components/create-new-password-form.tsx](src/features/user-mgmt/components/create-new-password-form.tsx#L70-L72)  
**Lines:** 70-72  
**Issue:** setTimeout for redirect without cleanup.  
**Severity:** HIGH

```typescript
// PROBLEMATIC CODE
setTimeout(() => {
  router.push("/login")
}, 2000)
```

---

### 6. setTimeout without cleanup in monitoring page
**File:** [src/app/admin/(management)/monitoring/page.tsx](src/app/admin/(management)/monitoring/page.tsx#L61)  
**Line:** 61  
**Issue:** setTimeout for print dialog without cleanup.  
**Severity:** MEDIUM

```typescript
// PROBLEMATIC CODE
setTimeout(() => { win.print() }, 500)
```

---

## Problematic useCallback Dependencies (High Priority)

### 7. Missing token dependency in useNotifications
**File:** [src/hooks/useNotifications.ts](src/hooks/useNotifications.ts#L19)  
**Lines:** 19-62  
**Issue:** `fetchNotifications` depends on `[user, notificationsStore]` but uses `token` without including it. When token changes (after login), fetchNotifications won't update, causing stale closures.  
**Severity:** HIGH - Silent bug, functions use outdated token

```typescript
// PROBLEMATIC CODE
const fetchNotifications = useCallback(
  async (unreadOnly: boolean = false) => {
    if (!user) return
    if (!token) return  // ← Uses token but not in dependency array
    // ... rest of function
  },
  [user, notificationsStore]  // ← Missing token!
)
```

---

### 8. useCart dependency issues with token changes
**File:** [src/hooks/useCart.ts](src/hooks/useCart.ts#L19-L45)  
**Lines:** 19-45  
**Issue:** `fetchCart` and other methods depend on `[user, token, cartStore]`. Token could be undefined or change, causing function recreations and cascading dependency updates.  
**Severity:** MEDIUM - Potential re-render loops

```typescript
// PROBLEMATIC CODE
const fetchCart = useCallback(async () => {
  if (!user || !token) return
  // ...
}, [user, token, cartStore])  // ← token can be undefined/change frequently
```

---

### 9. useOrders dependency with token
**File:** [src/hooks/useOrders.ts](src/hooks/useOrders.ts#L19-L50)  
**Lines:** 19-50  
**Issue:** Same issue as useCart - token dependency that can be undefined.  
**Severity:** MEDIUM

---

### 10. useProducts unnecessary dependency on store
**File:** [src/hooks/useProducts.ts](src/hooks/useProducts.ts#L11-L42)  
**Lines:** 11-42  
**Issue:** `fetchProducts` and `fetchProductById` depend on `[productsStore]`. Store is stable (Zustand), but dependency array seems unnecessary. If store recreates, functions unnecessarily update.  
**Severity:** LOW-MEDIUM

---

## useEffect Dependency Issues

### 11. useEffect in checkout with router dependency
**File:** [src/app/customer/checkout/page.tsx](src/app/customer/checkout/page.tsx#L31-L35)  
**Lines:** 31-35  
**Issue:** Router is included in dependency array but typically should only depend on items. Router reference changes frequently.  
**Severity:** MEDIUM

```typescript
// PROBLEMATIC CODE
useEffect(() => {
  if (items.length === 0) {
    router.push("/customer/cart")
  }
}, [items, router])  // ← router shouldn't be a dependency
```

**Better:**
```typescript
useEffect(() => {
  if (items.length === 0) {
    router.push("/customer/cart")
  }
}, [items])
```

---

### 12. useEffect in keyboard event handler
**File:** [src/features/cashier-dashboard/components/cart-sidebar.tsx](src/features/cashier-dashboard/components/cart-sidebar.tsx#L57-L70)  
**Lines:** 57-70  
**Issue:** Large dependency array `[items, amountPaid, total, paymentMethod, completeSale, clearCart]` causes event listener to be re-attached on every value change, causing excessive DOM listener updates.  
**Severity:** MEDIUM - Performance issue

```typescript
// PROBLEMATIC CODE
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    // ...
    completeSale()
  }
  window.addEventListener("keydown", handleKeyDown)
  return () => window.removeEventListener("keydown", handleKeyDown)
}, [items, amountPaid, total, paymentMethod, completeSale, clearCart])  // ← Too many deps
```

**Better:** Use useCallback with minimal deps for completeSale, or use ref + useEffect.

---

### 13. useCallback in completeSale with large dependency array
**File:** [src/features/cashier-dashboard/components/cart-sidebar.tsx](src/features/cashier-dashboard/components/cart-sidebar.tsx#L34-L54)  
**Lines:** 34-54  
**Issue:** `completeSale` callback depends on `[items, amountPaid, total, paymentMethod, clearCart]`. Every time any value changes, callback recreates, causing useEffect to re-attach listeners.  
**Severity:** MEDIUM - Unnecessary re-renders

---

### 14. useCallback in RecentOrdersTable - missing orders dependency
**File:** [src/features/customer-dashboard/components/recent-orders-table.tsx](src/features/customer-dashboard/components/recent-orders-table.tsx#L40-L50)  
**Lines:** 40-50  
**Issue:** `useMemo` depends on `[orders]`, useEffect depends on `[fetchOrders]`. This is correct, but the pattern suggests potential issues with stale closures.  
**Severity:** LOW - Pattern is actually correct but fragile

---

### 15. useCallback/useState mismatch in admin sales page
**File:** [src/app/admin/(management)/sales/page.tsx](src/app/admin/(management)/sales/page.tsx#L15-L35)  
**Lines:** 15-35  
**Issue:** `fetchData` depends on `[branchId, dateFrom, dateTo, page]`. When any filter changes, fetchData recreates, triggering useEffect, which calls fetchData. This is correct but creates a complex chain.  
**Severity:** LOW - Works correctly but fragile pattern

---

## Summary by Severity

### 🔴 CRITICAL (setTimeout leaks)
- Lines marked with setTimeout without cleanup (6 instances)

### 🟠 HIGH (Missing dependencies)
- useNotifications missing token dependency (#7)

### 🟡 MEDIUM (Problematic patterns)
- useCart/useOrders token dependencies (#8, #9)
- Router in checkout dependency array (#11)
- Event listener re-attachment in cart-sidebar (#12, #13)

### 🟢 LOW
- useProducts store dependency (#10)
- Complex but working patterns (#14, #15)

---

## Recommended Fixes

1. **Immediate:** Wrap all setTimeout calls in useEffect with proper cleanup
2. **Important:** Add token to dependency arrays in hooks
3. **Soon:** Optimize useEffect dependencies in keyboard handlers
4. **Nice-to-have:** Refactor event listeners to avoid re-attachment

