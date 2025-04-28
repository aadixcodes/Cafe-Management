import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { DataCard } from '@/components/ui/data-card';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { useTransactions } from '@/contexts/TransactionContext';
import { formatRupees } from '@/utils/currencyConverter';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

export default function DashboardPage() {
  const { totalExpenses, totalEarnings, netProfit, recentTransactions, isLoading } = useTransactions();

  // Prepare data for the chart
  const chartData = React.useMemo(() => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return format(date, 'yyyy-MM-dd');
    }).reverse();

    return last30Days.map(date => {
      const daySales = recentTransactions
        .filter(t => t.date === date)
        .reduce((sum, t) => {
          if ('totalSale' in t) {
            return sum + t.totalSale;
          } else {
            return sum - t.totalCost;
          }
        }, 0);

      return {
        date: format(new Date(date), 'MMM dd'),
        value: daySales
      };
    });
  }, [recentTransactions]);

  return (
    <PageLayout>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-cafe-text-muted text-sm sm:text-base">Overview of your cafe's performance</p>
      </div>

      {/* DataCards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <DataCard 
          title="Total Earnings" 
          value={formatRupees(totalEarnings)} 
          icon={<TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />}
          className="text-xs sm:text-sm"
        />
        <DataCard 
          title="Total Expenses" 
          value={formatRupees(totalExpenses)} 
          icon={<TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />}
          className="text-xs sm:text-sm"
        />
        <DataCard 
          title="Net Profit" 
          value={formatRupees(netProfit)} 
          icon={<DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />}
          className={`text-xs sm:text-sm ${netProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}
        />
      </div>

      {/* Chart Section */}
      <div className="bg-cafe-background border border-cafe-border rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">30-Day Performance</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#1E43A0" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div className="bg-cafe-background border border-cafe-border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-cafe-border">
                <th className="pb-2">Date</th>
                <th className="pb-2">Type</th>
                <th className="pb-2">Item</th>
                <th className="pb-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction, index) => (
                <tr key={index} className="border-b border-cafe-border last:border-0">
                  <td className="py-2">{format(new Date(transaction.date), 'MMM dd, yyyy')}</td>
                  <td className="py-2">
                    {'totalSale' in transaction ? 'Sale' : 'Purchase'}
                  </td>
                  <td className="py-2">{transaction.itemName}</td>
                  <td className="py-2 text-right">
                    {formatRupees('totalSale' in transaction ? transaction.totalSale : -transaction.totalCost)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
}
