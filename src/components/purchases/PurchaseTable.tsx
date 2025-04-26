
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { DateRange } from 'react-day-picker';
import { Search, Plus } from 'lucide-react';
import { Purchase, PaginationInfo, FilterOptions } from '@/types/models';

interface PurchaseTableProps {
  purchases: Purchase[];
  onAddPurchase: () => void;
  onEditPurchase: (purchase: Purchase) => void;
}

export function PurchaseTable({ purchases, onAddPurchase, onEditPurchase }: PurchaseTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    pageSize: 10,
    totalItems: purchases.length,
    totalPages: Math.ceil(purchases.length / 10)
  });
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Filter purchases based on search and date range
  const filteredPurchases = purchases.filter(purchase => {
    const matchesSearch = !searchTerm || 
      purchase.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.category.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesDateRange = !dateRange.from || !dateRange.to ||
      (new Date(purchase.date) >= dateRange.from && new Date(purchase.date) <= dateRange.to);
      
    return matchesSearch && matchesDateRange;
  });
  
  // Calculate pagination
  const paginatedPurchases = filteredPurchases.slice(
    (pagination.page - 1) * pagination.pageSize, 
    pagination.page * pagination.pageSize
  );
  
  const handlePageChange = (page: number) => {
    setPagination(prev => ({
      ...prev,
      page
    }));
  };

  return (
    <Card className="glass-panel card-shadow mt-6">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle className="text-xl">Purchase Records</CardTitle>
          <Button onClick={onAddPurchase} className="bg-cafe-accent hover:bg-cafe-accent-light button-glow">
            <Plus size={16} className="mr-2" />
            Add Purchase
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-cafe-text-muted" />
              <Input
                placeholder="Search purchases..."
                className="pl-8 bg-cafe-card border-cafe-border"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            className="w-full md:w-72"
          />
        </div>
        
        <div className="rounded-md border border-cafe-border overflow-hidden">
          <Table>
            <TableHeader className="bg-cafe-card">
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="hidden md:table-cell">Supplier</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedPurchases.length > 0 ? (
                paginatedPurchases.map((purchase) => (
                  <TableRow 
                    key={purchase.id} 
                    className="hover:bg-cafe-card-hover cursor-pointer"
                    onClick={() => onEditPurchase(purchase)}
                  >
                    <TableCell>{formatDate(purchase.date)}</TableCell>
                    <TableCell>{purchase.itemName}</TableCell>
                    <TableCell>
                      <span className="inline-block rounded-full px-2 py-1 text-xs font-semibold bg-cafe-accent/10 text-cafe-accent">
                        {purchase.category}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{purchase.supplier}</TableCell>
                    <TableCell className="text-right">{purchase.quantity}</TableCell>
                    <TableCell className="text-right">{formatCurrency(purchase.unitPrice)}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(purchase.totalCost)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-cafe-text-muted">
                    No purchases found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        {filteredPurchases.length > 0 && (
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-cafe-text-muted">
              Showing {((pagination.page - 1) * pagination.pageSize) + 1} to {Math.min(pagination.page * pagination.pageSize, filteredPurchases.length)} of {filteredPurchases.length} entries
            </div>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page === 1}
                onClick={() => handlePageChange(pagination.page - 1)}
                className="bg-cafe-card border-cafe-border hover:bg-cafe-card-hover"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page === Math.ceil(filteredPurchases.length / pagination.pageSize)}
                onClick={() => handlePageChange(pagination.page + 1)}
                className="bg-cafe-card border-cafe-border hover:bg-cafe-card-hover"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
