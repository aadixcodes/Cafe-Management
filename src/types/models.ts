
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  avatar?: string;
}

export interface FinancialSummary {
  totalExpenses: number;
  totalEarnings: number;
  netProfit: number;
  expenseChange: number;
  earningsChange: number;
  profitChange: number;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface MonthlyTrend {
  month: string;
  expenses: number;
  earnings: number;
}

export interface ItemSummary {
  name: string;
  value: number;
  percentage?: number;
  color?: string;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'purchase' | 'sale';
  itemName: string;
  quantity: number;
  price: number;
  total: number;
  supplier?: string;
  customer?: string;
}

export interface Purchase {
  id: string;
  date: string;
  itemId: string;
  itemName: string;
  category: string;
  unitPrice: number;
  quantity: number;
  totalCost: number;
  supplier: string;
  notes?: string;
}

export interface Sale {
  id: string;
  date: string;
  itemId: string;
  itemName: string;
  category: string;
  costPrice: number;
  salePrice: number;
  quantity: number;
  totalSale: number;
  profit: number;
  customer?: string;
  notes?: string;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface FilterOptions {
  dateRange?: {
    from: Date | null;
    to: Date | null;
  };
  searchTerm?: string;
  category?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
