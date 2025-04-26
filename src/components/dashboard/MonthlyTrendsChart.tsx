
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MonthlyTrend } from '@/types/models';

interface MonthlyTrendsChartProps {
  data: MonthlyTrend[];
}

export function MonthlyTrendsChart({ data }: MonthlyTrendsChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="bg-[#1B1B23] border-cafe-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg md:text-xl">Monthly Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#316BF0" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#316BF0" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#32323E" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis 
                stroke="#9CA3AF"
                tickFormatter={formatCurrency}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#21212C', 
                  borderColor: '#32323E', 
                  color: '#FFFFFF' 
                }}
                formatter={(value: number) => [formatCurrency(value)]}
              />
              <Legend iconType="circle" />
              <Area 
                type="monotone" 
                dataKey="expenses" 
                stroke="#ef4444" 
                fillOpacity={1} 
                fill="url(#colorExpenses)" 
                name="Expenses"
              />
              <Area 
                type="monotone" 
                dataKey="earnings" 
                stroke="#316BF0" 
                fillOpacity={1} 
                fill="url(#colorEarnings)" 
                name="Earnings"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
