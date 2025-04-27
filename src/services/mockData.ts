import { 
  FinancialSummary,
  MonthlyTrend,
  ItemSummary,
  Transaction,
  Purchase,
  Sale
} from '@/types/models';

// Mock Financial Summary
export const getFinancialSummary = (): FinancialSummary => ({
  totalExpenses: 0,
  totalEarnings: 0,
  netProfit: 0,
  expenseChange: 0,
  earningsChange: 0,
  profitChange: 0
});

// Mock Monthly Trends
export const getMonthlyTrends = (): MonthlyTrend[] => [];

// Mock Top Purchased Items
export const getTopPurchasedItems = (): ItemSummary[] => [];

// Mock Top Sold Items
export const getTopSoldItems = (): ItemSummary[] => [];

// Mock Recent Transactions
export const getRecentTransactions = (): Transaction[] => [];

// Mock Purchases Data
export const getPurchases = (): Purchase[] => [];

// Mock Sales Data
export const getSales = (): Sale[] => [];
