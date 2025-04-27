// import React from 'react';
// import { DataCard } from '@/components/ui/data-card';
// import { DollarSign, ShoppingBag, TrendingUp } from 'lucide-react';
// import { FinancialSummary } from '@/types/models';
// import { convertToRupees, formatRupees } from '@/utils/currencyConverter';

// interface SummaryCardsProps {
//   data: FinancialSummary;
// }

// export function SummaryCards({ data }: SummaryCardsProps) {
//   return (
//     <div className="grid bg-white gap-4 md:grid-cols-2 lg:grid-cols-3">
//       <DataCard 
//         title="Total Expenses" 
//         value={formatRupees(convertToRupees(data.totalExpenses))} 
//         trend={{ value: data.expenseChange, isPositive: false }}
//         description="vs last month"
//         icon={<ShoppingBag size={18} />}
//       />
//       <DataCard 
//         title="Total Earnings" 
//         value={formatRupees(convertToRupees(data.totalEarnings))} 
//         trend={{ value: data.earningsChange, isPositive: true }}
//         description="vs last month" 
//         icon={<DollarSign size={18} />}
//       />
//       <DataCard 
//         title="Net Profit" 
//         value={formatRupees(convertToRupees(data.netProfit))} 
//         trend={{ value: data.profitChange, isPositive: true }}
//         description="vs last month" 
//         icon={<TrendingUp size={18} />}
//       />
//     </div>
//   );
// }



import React from 'react';
import { DataCard } from '@/components/ui/data-card';
import { DollarSign, ShoppingBag, TrendingUp } from 'lucide-react';
import { FinancialSummary } from '@/types/models';
import { convertToRupees, formatRupees } from '@/utils/currencyConverter';

interface SummaryCardsProps {
  data: FinancialSummary;
}

export function SummaryCards({ data }: SummaryCardsProps) {
  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      <DataCard 
        title="Total Expenses" 
        value={formatRupees(convertToRupees(data.totalExpenses))} 
        trend={{ value: data.expenseChange, isPositive: false }}
        description="vs last month"
        icon={<ShoppingBag size={18} />}
        className="text-sm"
      />
      <DataCard 
        title="Total Earnings" 
        value={formatRupees(convertToRupees(data.totalEarnings))} 
        trend={{ value: data.earningsChange, isPositive: true }}
        description="vs last month" 
        icon={<DollarSign size={18} />}
        className="text-sm"
      />
      <DataCard 
        title="Net Profit" 
        value={formatRupees(convertToRupees(data.netProfit))} 
        trend={{ value: data.profitChange, isPositive: true }}
        description="vs last month" 
        icon={<TrendingUp size={18} />}
        className="text-sm col-span-2 md:col-span-1 lg:col-span-1"
      />
    </div>
  );
}