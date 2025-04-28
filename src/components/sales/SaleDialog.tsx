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
import { Sale } from '@/types/models';

interface SaleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (sale: Sale) => void;
  sale?: Sale;
}

export function SaleDialog({ isOpen, onClose, onSave, sale }: SaleDialogProps) {
  const [formData, setFormData] = useState<Partial<Sale>>({
    itemName: sale?.itemName || '',
    salePrice: sale?.salePrice || 0,
    quantity: sale?.quantity || 0,
    date: sale?.date || new Date().toISOString().split('T')[0],
    category: sale?.category || 'General'
  });
  
  const [date, setDate] = useState<Date | undefined>(
    sale ? new Date(sale.date) : new Date()
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updatedData = { ...prev, [name]: value };
      
      if (['quantity', 'salePrice'].includes(name)) {
        const quantity = name === 'quantity' ? Number(value) : (prev.quantity || 0);
        const salePrice = name === 'salePrice' ? Number(value) : (prev.salePrice || 0);
        
        updatedData.totalSale = quantity * salePrice;
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
    if (!formData.itemName || !formData.quantity || !formData.salePrice) {
      return;
    }

    const quantity = Number(formData.quantity);
    const salePrice = Number(formData.salePrice);

    const saleData: Sale = {
      id: sale?.id || `s${Date.now()}`,
      itemId: sale?.itemId || `item-${Date.now()}`,
      itemName: formData.itemName,
      category: formData.category || 'General',
      quantity: quantity,
      salePrice: salePrice,
      totalSale: quantity * salePrice,
      date: formData.date || new Date().toISOString().split('T')[0],
      customer: formData.customer,
      notes: formData.notes
    };

    onSave(saleData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-cafe-background border-cafe-border">
        <DialogHeader>
          <DialogTitle>{sale ? 'Edit Sale' : 'Add Sale'}</DialogTitle>
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
            <Label htmlFor="salePrice">Sale Price (₹)</Label>
            <Input
              id="salePrice"
              name="salePrice"
              type="number"
              min="0"
              step="0.01"
              value={formData.salePrice}
              onChange={handleInputChange}
              className="bg-cafe-card/50 border-cafe-border"
            />
          </div>
          
          <div className="grid gap-2">
            <Label>Sale Date</Label>
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
          <Button className='bg-[#1B1B23]' variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {sale ? 'Update' : 'Add'} Sale
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
