import React, { useState, useEffect } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SaleTable } from '@/components/sales/SaleTable';
import { SaleDialog } from '@/components/sales/SaleDialog';
import { DataCard } from '@/components/ui/data-card';
import { ShoppingBag, DollarSign } from 'lucide-react';
import { Sale } from '@/types/models';
import { formatRupees } from '@/utils/currencyConverter';
import { getSales, addSale, updateSale, deleteSale } from '@/lib/database';
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

export default function SalesPage() {
  const { refreshData } = useTransactions();
  const [sales, setSales] = useState<Sale[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState<Sale | undefined>(undefined);
  const [saleToDelete, setSaleToDelete] = useState<Sale | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    try {
      setIsLoading(true);
      const data = await getSales();
      setSales(data);
    } catch (error) {
      console.error('Error loading sales:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddSale = () => {
    setSelectedSale(undefined);
    setIsDialogOpen(true);
  };
  
  const handleEditSale = (sale: Sale) => {
    setSelectedSale(sale);
    setIsDialogOpen(true);
  };

  const handleDeleteSale = (sale: Sale) => {
    setSaleToDelete(sale);
  };

  const confirmDelete = async () => {
    if (saleToDelete) {
      try {
        await deleteSale(saleToDelete.id);
        await refreshData();
        setSaleToDelete(null);
      } catch (error) {
        console.error('Error deleting sale:', error);
      }
    }
  };
  
  const handleSaveSale = async (saleData: Sale) => {
    try {
      if (selectedSale) {
        // Update existing sale
        const updatedSale = await updateSale(selectedSale.id, saleData);
        setSales(prev => prev.map(s => s.id === updatedSale.id ? updatedSale : s));
      } else {
        // Add new sale
        const newSale = await addSale(saleData);
        setSales(prev => [...prev, newSale]);
      }
      await refreshData();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving sale:', error);
    }
  };
  
  const totalSales = sales.reduce((sum, sale) => sum + sale.totalSale, 0);
  const totalItems = sales.reduce((sum, sale) => sum + sale.quantity, 0);
  
  return (
    <PageLayout>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Sales</h1>
        <p className="text-cafe-text-muted text-sm sm:text-base">Manage and track sales records</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <DataCard 
          title="Total Sales" 
          value={formatRupees(totalSales)} 
          icon={<DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />}
          className="text-xs sm:text-sm"
        />
        <DataCard 
          title="Total Items Sold" 
          value={totalItems.toString()} 
          icon={<ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />}
          className="text-xs sm:text-sm"
        />
      </div>
      
      <div className="mt-2 sm:mt-4">
        <SaleTable 
          sales={sales}
          onAddSale={handleAddSale}
          onEditSale={handleEditSale}
          onDeleteSale={handleDeleteSale}
          isLoading={isLoading}
        />
      </div>
      
      <SaleDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveSale}
        sale={selectedSale}
      />

      <AlertDialog open={!!saleToDelete} onOpenChange={() => setSaleToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Sale Record</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-2">
                <p>Are you sure you want to delete this sale record?</p>
                {saleToDelete && (
                  <div className="bg-cafe-card/50 p-3 rounded-md space-y-1">
                    <p><span className="font-medium">Item:</span> {saleToDelete.itemName}</p>
                    <p><span className="font-medium">Quantity:</span> {saleToDelete.quantity}</p>
                    <p><span className="font-medium">Price per Item:</span> {formatRupees(saleToDelete.salePrice)}</p>
                    <p><span className="font-medium">Total:</span> {formatRupees(saleToDelete.quantity * saleToDelete.salePrice)}</p>
                    <p><span className="font-medium">Date:</span> {new Date(saleToDelete.date).toLocaleDateString()}</p>
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
