
import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PurchaseTable } from '@/components/purchases/PurchaseTable';
import { PurchaseDialog } from '@/components/purchases/PurchaseDialog';
import { DataCard } from '@/components/ui/data-card';
import { ShoppingBag, DollarSign } from 'lucide-react';
import { getPurchases } from '@/services/mockData';
import { Purchase } from '@/types/models';

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<Purchase[]>(getPurchases());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | undefined>(undefined);
  
  const handleAddPurchase = () => {
    setSelectedPurchase(undefined);
    setIsDialogOpen(true);
  };
  
  const handleEditPurchase = (purchase: Purchase) => {
    setSelectedPurchase(purchase);
    setIsDialogOpen(true);
  };
  
  const handleSavePurchase = (purchaseData: Purchase) => {
    if (selectedPurchase) {
      // Update existing purchase
      setPurchases(prev => prev.map(p => p.id === purchaseData.id ? purchaseData : p));
    } else {
      // Add new purchase
      setPurchases(prev => [...prev, purchaseData]);
    }
  };
  
  // Calculate summary stats
  const totalPurchases = purchases.reduce((sum, purchase) => sum + purchase.totalCost, 0);
  const totalItems = purchases.reduce((sum, purchase) => sum + purchase.quantity, 0);
  
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
        <h1 className="text-3xl font-bold mb-2">Purchases</h1>
        <p className="text-cafe-text-muted">Manage and track inventory purchases</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <DataCard 
          title="Total Purchase Expenses" 
          value={formatCurrency(totalPurchases)} 
          icon={<DollarSign size={18} />}
        />
        <DataCard 
          title="Total Purchased Items" 
          value={totalItems.toString()} 
          icon={<ShoppingBag size={18} />}
        />
      </div>
      
      <PurchaseTable 
        purchases={purchases}
        onAddPurchase={handleAddPurchase}
        onEditPurchase={handleEditPurchase}
      />
      
      <PurchaseDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSavePurchase}
        purchase={selectedPurchase}
      />
    </PageLayout>
  );
}
