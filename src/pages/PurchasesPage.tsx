import React, { useState, useEffect } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PurchaseTable } from '@/components/purchases/PurchaseTable';
import { PurchaseDialog } from '@/components/purchases/PurchaseDialog';
import { DataCard } from '@/components/ui/data-card';
import { ShoppingBag, DollarSign } from 'lucide-react';
import { Purchase } from '@/types/models';
import { formatRupees } from '@/utils/currencyConverter';
import { getPurchases, addPurchase, updatePurchase, deletePurchase } from '@/lib/database';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTransactions } from '@/contexts/TransactionContext';

export default function PurchasesPage() {
  const { refreshData } = useTransactions();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | undefined>(undefined);
  const [purchaseToDelete, setPurchaseToDelete] = useState<Purchase | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    loadPurchases();
  }, []);

  const loadPurchases = async () => {
    try {
      setIsLoading(true);
      const data = await getPurchases();
      setPurchases(data);
    } catch (error) {
      console.error('Error loading purchases:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddPurchase = () => {
    setSelectedPurchase(undefined);
    setIsDialogOpen(true);
  };
  
  const handleEditPurchase = (purchase: Purchase) => {
    setSelectedPurchase(purchase);
    setIsDialogOpen(true);
  };

  const handleDeletePurchase = (purchase: Purchase) => {
    setPurchaseToDelete(purchase);
  };

  const confirmDelete = async () => {
    if (purchaseToDelete) {
      try {
        await deletePurchase(purchaseToDelete.id);
        await refreshData();
        setPurchaseToDelete(null);
      } catch (error) {
        console.error('Error deleting purchase:', error);
      }
    }
  };
  
  const handleSavePurchase = async (purchaseData: Purchase) => {
    try {
      if (selectedPurchase) {
        // Update existing purchase
        const updatedPurchase = await updatePurchase(selectedPurchase.id, purchaseData);
        setPurchases(prev => prev.map(p => p.id === updatedPurchase.id ? updatedPurchase : p));
      } else {
        // Add new purchase
        const newPurchase = await addPurchase(purchaseData);
        setPurchases(prev => [...prev, newPurchase]);
      }
      await refreshData();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving purchase:', error);
    }
  };
  
  // Calculate summary stats
  const totalPurchases = purchases.reduce((sum, purchase) => sum + purchase.totalCost, 0);
  const totalItems = purchases.reduce((sum, purchase) => sum + purchase.quantity, 0);
  
  return (
    <PageLayout>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Purchases</h1>
        <p className="text-cafe-text-muted text-sm sm:text-base">Manage and track inventory purchases</p>
      </div>
      
      {/* DataCards Section with responsive spacing */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <DataCard 
          title="Total Purchase Expenses" 
          value={formatRupees(totalPurchases)} 
          icon={<DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />}
          className="text-xs sm:text-sm"
        />
        <DataCard 
          title="Total Purchased Items" 
          value={totalItems.toString()} 
          icon={<ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />}
          className="text-xs sm:text-sm"
        />
      </div>
      
      {/* Purchase Table with proper spacing from cards */}
      <div className="mt-2 sm:mt-4">
        <PurchaseTable 
          purchases={purchases}
          onAddPurchase={handleAddPurchase}
          onEditPurchase={handleEditPurchase}
          onDeletePurchase={handleDeletePurchase}
          isLoading={isLoading}
        />
      </div>
      
      <PurchaseDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSavePurchase}
        purchase={selectedPurchase}
      />

      <AlertDialog open={!!purchaseToDelete} onOpenChange={() => setPurchaseToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Purchase Record</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-2">
                <p>Are you sure you want to delete this purchase record?</p>
                {purchaseToDelete && (
                  <div className="bg-cafe-card/50 p-3 rounded-md space-y-1">
                    <p><span className="font-medium">Item:</span> {purchaseToDelete.itemName}</p>
                    <p><span className="font-medium">Quantity:</span> {purchaseToDelete.quantity}</p>
                    <p><span className="font-medium">Price per Item:</span> {formatRupees(purchaseToDelete.unitPrice)}</p>
                    <p><span className="font-medium">Total:</span> {formatRupees(purchaseToDelete.totalCost)}</p>
                    <p><span className="font-medium">Date:</span> {new Date(purchaseToDelete.date).toLocaleDateString()}</p>
                  </div>
                )}
                <p className="text-red-500">This action cannot be undone.</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-[#1E43A0]">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout>
  );
}