import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Purchase } from '@/types/models';
import { convertToRupees } from '@/utils/currencyConverter';

interface PurchaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (purchase: Purchase) => void;
  purchase?: Purchase;
}

export function PurchaseDialog({ isOpen, onClose, onSave, purchase }: PurchaseDialogProps) {
  const [formData, setFormData] = useState<Partial<Purchase>>({
    itemName: purchase?.itemName || '',
    quantity: purchase?.quantity || 0,
    unitPrice: purchase?.unitPrice || 0,
    date: purchase?.date || new Date().toISOString().split('T')[0]
  });
  const [date, setDate] = useState<Date | undefined>(
    purchase ? new Date(purchase.date) : new Date()
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updatedData = { ...prev, [name]: value };
      
      if (name === 'quantity' || name === 'unitPrice') {
        const quantity = name === 'quantity' ? Number(value) : (prev.quantity || 0);
        const unitPrice = name === 'unitPrice' ? Number(value) : (prev.unitPrice || 0);
        updatedData.totalCost = quantity * unitPrice;
      }
      return updatedData;
    });
  };

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      setFormData(prev => ({
        ...prev,
        date: newDate.toISOString().split('T')[0]
      }));
    }
  };

  const handleSubmit = () => {
    if (!formData.itemName || !formData.quantity || !formData.unitPrice || !formData.date) {
      return; // Add validation feedback if needed
    }

    const purchaseData: Purchase = {
      id: purchase?.id || `p${Date.now()}`,
      itemId: purchase?.itemId || `item-${Date.now()}`,
      itemName: formData.itemName,
      category: purchase?.category || 'General', // Default category
      quantity: Number(formData.quantity),
      unitPrice: Number(formData.unitPrice),
      totalCost: Number(formData.quantity) * Number(formData.unitPrice),
      date: formData.date,
      supplier: purchase?.supplier || 'Direct Purchase', // Default supplier
      notes: formData.notes
    };

    onSave(purchaseData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-cafe-background border-cafe-border">
        <DialogHeader>
          <DialogTitle>{purchase ? 'Edit Purchase' : 'Add Purchase'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="itemName">Item Name</Label>
            <Input
              id="itemName"
              name="itemName"
              value={formData.itemName}
              onChange={handleInputChange}
              className="bg-cafe-card/50 border-cafe-border"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={handleInputChange}
              className="bg-cafe-card/50 border-cafe-border"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="unitPrice">Price per Item (₹)</Label>
            <Input
              id="unitPrice"
              name="unitPrice"
              type="number"
              min="0"
              step="0.01"
              value={formData.unitPrice}
              onChange={handleInputChange}
              className="bg-cafe-card/50 border-cafe-border"
            />
          </div>
          <div className="grid gap-2">
            <Label>Purchasing Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-cafe-card/50 border-cafe-border",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-cafe-background border-cafe-border">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  initialFocus
                  className="bg-cafe-background"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {purchase ? 'Update' : 'Add'} Purchase
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
