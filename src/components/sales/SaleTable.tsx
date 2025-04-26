
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { DateRange } from 'react-day-picker';
import { Search, Plus } from 'lucide-react';
import { Sale, PaginationInfo } from '@/types/models';

interface SaleTableProps {
  sales: Sale[];
  onAddSale: () => void;
  onEditSale: (sale: Sale) => void;
}

export function SaleTable({ sales, onAddSale, onEditSale }: SaleTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    pageSize: 10,
    totalItems: sales.length,
    totalPages: Math.ceil(sales.length / 10)
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

  // Filter sales based on search and date range
  const filteredSales = sales.filter(sale => {
    const matchesSearch = !searchTerm || 
      sale.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.category.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesDateRange = !dateRange.from || !dateRange.to ||
      (new Date(sale.date) >= dateRange.from && new Date(sale.date) <= dateRange.to);
      
    return matchesSearch && matchesDateRange;
  });
  
  // Calculate pagination
  const paginatedSales = filteredSales.slice(
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
          <CardTitle className="text-xl">Sales Records</CardTitle>
          <Button onClick={onAddSale} className="bg-cafe-accent hover:bg-cafe-accent-light button-glow">
            <Plus size={16} className="mr-2" />
            Add Sale
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-cafe-text-muted" />
              <Input
                placeholder="Search sales..."
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
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right hidden lg:table-cell">Cost</TableHead>
                <TableHead className="text-right">Sale Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Profit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedSales.length > 0 ? (
                paginatedSales.map((sale) => (
                  <TableRow 
                    key={sale.id} 
                    className="hover:bg-cafe-card-hover cursor-pointer"
                    onClick={() => onEditSale(sale)}
                  >
                    <TableCell>{formatDate(sale.date)}</TableCell>
                    <TableCell>{sale.itemName}</TableCell>
                    <TableCell>
                      <span className="inline-block rounded-full px-2 py-1 text-xs font-semibold bg-cafe-accent/10 text-cafe-accent">
                        {sale.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">{sale.quantity}</TableCell>
                    <TableCell className="text-right hidden lg:table-cell">{formatCurrency(sale.costPrice)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(sale.salePrice)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(sale.totalSale)}</TableCell>
                    <TableCell className="text-right font-medium text-cafe-success">{formatCurrency(sale.profit)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-cafe-text-muted">
                    No sales found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        {filteredSales.length > 0 && (
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-cafe-text-muted">
              Showing {((pagination.page - 1) * pagination.pageSize) + 1} to {Math.min(pagination.page * pagination.pageSize, filteredSales.length)} of {filteredSales.length} entries
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
                disabled={pagination.page === Math.ceil(filteredSales.length / pagination.pageSize)}
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
