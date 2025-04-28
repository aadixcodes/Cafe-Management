import React, { createContext, useContext, useState, useEffect } from 'react';
import { Purchase, Sale } from '@/types/models';
import { getPurchases, getSales } from '@/lib/database';

interface TransactionContextType {
  purchases: Purchase[];
  sales: Sale[];
  totalExpenses: number;
  totalEarnings: number;
  netProfit: number;
  recentTransactions: Array<Purchase | Sale>;
  isLoading: boolean;
  refreshData: () => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: React.ReactNode }) {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const totalExpenses = purchases.reduce((sum, purchase) => sum + purchase.totalCost, 0);
  const totalEarnings = sales.reduce((sum, sale) => sum + sale.totalSale, 0);
  const netProfit = totalEarnings - totalExpenses;

  const recentTransactions = [...purchases, ...sales]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  const refreshData = async () => {
    try {
      setIsLoading(true);
      const [purchasesData, salesData] = await Promise.all([
        getPurchases(),
        getSales()
      ]);
      setPurchases(purchasesData);
      setSales(salesData);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <TransactionContext.Provider value={{
      purchases,
      sales,
      totalExpenses,
      totalEarnings,
      netProfit,
      recentTransactions,
      isLoading,
      refreshData
    }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
} 