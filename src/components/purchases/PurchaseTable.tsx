import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { Purchase } from '@/types/models';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatRupees } from '@/utils/currencyConverter';

interface PurchaseTableProps {
  purchases: Purchase[];
  onAddPurchase: () => void;
  onEditPurchase: (purchase: Purchase) => void;
  onDeletePurchase?: (purchase: Purchase) => void;
}

export function PurchaseTable({ 
  purchases, 
  onAddPurchase, 
  onEditPurchase,
  onDeletePurchase 
}: PurchaseTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<string>('all');

  const uniqueItems = Array.from(new Set(purchases.map(p => p.itemName))).sort();

  const filteredPurchases = purchases.filter(purchase => {
    const matchesSearch = !searchTerm || 
      Object.values(purchase).some(value => 
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesItem = selectedItem === 'all' || purchase.itemName === selectedItem;
    return matchesSearch && matchesItem;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="bg-[#21212C]">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle className="text-xl">Purchase Records</CardTitle>
          <Button onClick={onAddPurchase} className="bg-blue-600 hover:bg-blue-700">
            <Plus size={16} className="mr-2" />
            Add Purchase
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search purchases..."
                className="pl-8 bg-background w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Select
            value={selectedItem}
            onValueChange={setSelectedItem}
          >
            <SelectTrigger className="w-full md:w-[200px] bg-background">
              <SelectValue placeholder="Filter by item" />
            </SelectTrigger>
            <SelectContent className="bg-[#21212C]">
              <SelectItem value="all">All Items</SelectItem>
              {uniqueItems.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="rounded-md border overflow-x-auto max-w-full">
          <div className="min-w-full overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">S.No</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Item Name</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Price per Item</TableHead>
                  <TableHead className="text-right">Total Money</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPurchases.length > 0 ? (
                  filteredPurchases.map((purchase, index) => (
                    <TableRow key={purchase.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{formatDate(purchase.date)}</TableCell>
                      <TableCell>{purchase.itemName}</TableCell>
                      <TableCell className="text-right">{purchase.quantity}</TableCell>
                      <TableCell className="text-right">{formatRupees(purchase.unitPrice)}</TableCell>
                      <TableCell className="text-right">{formatRupees(purchase.totalCost)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEditPurchase(purchase)}
                          >
                            <Edit size={16} />
                          </Button>
                          {onDeletePurchase && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onDeletePurchase(purchase)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash2 size={16} />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      No purchases found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
