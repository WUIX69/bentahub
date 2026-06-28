import type { Payment } from "@/types/employee"

export const payments: Payment[] = [
  {
    id: "PAY-5001",
    transactionId: "TXN-1001",
    referenceNumber: "REF-CASH-1001",
    method: "cash",
    amount: 937.5,
    status: "verified",
    date: "2026-05-22T08:15:30Z",
    customerName: "Walk-in Customer"
  },
  {
    id: "PAY-5002",
    transactionId: "TXN-1002",
    referenceNumber: "GCASH-987216354",
    method: "gcash",
    amount: 385.0,
    status: "verified",
    date: "2026-05-22T08:42:10Z",
    customerName: "Sarah Connor"
  },
  {
    id: "PAY-5003",
    transactionId: "TXN-1003",
    referenceNumber: "REF-CASH-1003",
    method: "cash",
    amount: 376.0,
    status: "verified",
    date: "2026-05-22T09:05:45Z",
    customerName: "Walk-in Customer"
  },
  {
    id: "PAY-5004",
    transactionId: "TXN-1004",
    referenceNumber: "REF-CASH-1004",
    method: "cash",
    amount: 42.0,
    status: "verified",
    date: "2026-05-22T09:30:00Z",
    customerName: "Walk-in Customer"
  },
  {
    id: "PAY-5005",
    transactionId: "TXN-1005",
    referenceNumber: "GCASH-881290382",
    method: "gcash",
    amount: 342.0,
    status: "pending",
    date: "2026-05-22T10:12:15Z",
    customerName: "John Doe"
  },
  {
    id: "PAY-5006",
    transactionId: "TXN-1007",
    referenceNumber: "GCASH-239103810",
    method: "gcash",
    amount: 500.0,
    status: "verified",
    date: "2026-05-22T13:20:18Z",
    customerName: "Jane Smith"
  },
  {
    id: "PAY-5007",
    transactionId: "TXN-1008",
    referenceNumber: "GCASH-449102830",
    method: "gcash",
    amount: 1250.0,
    status: "failed",
    date: "2026-05-22T14:05:10Z",
    customerName: "Alice Cooper"
  },
  {
    id: "PAY-5008",
    transactionId: "TXN-1009",
    referenceNumber: "GCASH-551029381",
    method: "gcash",
    amount: 189.0,
    status: "pending",
    date: "2026-05-22T14:30:00Z",
    customerName: "Bob Marley"
  }
]
