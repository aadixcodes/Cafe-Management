
import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SaleTable } from '@/components/sales/SaleTable';
import { SaleDialog } from '@/components/sales/SaleDialog';
import { DataCard } from '@/components/ui/data-card';
import { DollarSign, TrendingUp } from 'lucide-react';
import { getSales } from '@/services/mockData';
import { Sale } from '@/types/models';

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>(getSales());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState<Sale | undefined>(undefined);
  
  const handleAddSale = () => {
    setSelectedSale(undefined);
    setIsDialogOpen(true);
  };
  
  const handleEditSale = (sale: Sale) => {
    setSelectedSale(sale);
    setIsDialogOpen(true);
  };
  
  const handleSaveSale = (saleData: Sale) => {
    if (selectedSale) {
      // Update existing sale
      setSales(prev => prev.map(s => s.id === saleData.id ? saleData : s));
    } else {
      // Add new sale
      setSales(prev => [...prev, saleData]);
    }
  };
  
  // Calculate summary stats
  const totalSales = sales.reduce((sum, sale) => sum + sale.totalSale, 0);
  const totalProfit = sales.reduce((sum, sale) => sum + sale.profit, 0);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Sales</h1>
        <p className="text-cafe-text-muted">Track sales and monitor profit margins</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <DataCard 
          title="Total Sales" 
          value={formatCurrency(totalSales)} 
          icon={<DollarSign size={18} />}
        />
        <DataCard 
          title="Total Profit" 
          value={formatCurrency(totalProfit)} 
          icon={<TrendingUp size={18} />}
        />
      </div>
      
      <SaleTable 
        sales={sales}
        onAddSale={handleAddSale}
        onEditSale={handleEditSale}
      />
      
      <SaleDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveSale}
        sale={selectedSale}
      />
    </PageLayout>
  );
}
