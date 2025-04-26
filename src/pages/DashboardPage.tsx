
import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { MonthlyTrendsChart } from '@/components/dashboard/MonthlyTrendsChart';
import { TopItemsCharts } from '@/components/dashboard/TopItemsCharts';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { 
  getFinancialSummary,
  getMonthlyTrends,
  getTopPurchasedItems,
  getTopSoldItems,
  getRecentTransactions
} from '@/services/mockData';

export default function DashboardPage() {
  const financialSummary = getFinancialSummary();
  const monthlyTrends = getMonthlyTrends();
  const topPurchasedItems = getTopPurchasedItems();
  const topSoldItems = getTopSoldItems();
  const recentTransactions = getRecentTransactions();

  return (
    <PageLayout>
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-cafe-text-muted text-sm md:text-base">Overview of your cafe's financial performance</p>
      </div>
      
      <div className="space-y-6 md:space-y-8">
        <SummaryCards data={financialSummary} />
        
        <div className="bg-[#1B1B23] rounded-lg border border-cafe-border p-4 md:p-6">
          <MonthlyTrendsChart data={monthlyTrends} />
        </div>
        
        <TopItemsCharts 
          purchasedItems={topPurchasedItems}
          soldItems={topSoldItems}
        />
        
        <RecentTransactions transactions={recentTransactions} />
      </div>
    </PageLayout>
  );
}
