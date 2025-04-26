import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SaleTable } from '@/components/sales/SaleTable';
import { SaleDialog } from '@/components/sales/SaleDialog';
import { DataCard } from '@/components/ui/data-card';
import { DollarSign, TrendingUp } from 'lucide-react';
import { getSales } from '@/services/mockData';
import { Sale } from '@/types/models';
import { formatRupees } from '@/utils/currencyConverter';

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
      setSales(prev => prev.map(s => s.id === saleData.id ? saleData : s));
    } else {
      setSales(prev => [...prev, saleData]);
    }
  };
  
  const totalSales = sales.reduce((sum, sale) => sum + sale.totalSale, 0);
  const totalProfit = sales.reduce((sum, sale) => sum + sale.profit, 0);
  
  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Sales</h1>
        <p className="text-muted-foreground">Track sales and monitor profit margins</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <DataCard 
          title="Total Sales" 
          value={formatRupees(totalSales)} 
          icon={<DollarSign size={18} />}
        />
        <DataCard 
          title="Total Profit" 
          value={formatRupees(totalProfit)} 
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
