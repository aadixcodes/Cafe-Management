
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
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
    itemName: '',
    category: '',
    costPrice: 0,
    salePrice: 0,
    quantity: 0,
    totalSale: 0,
    profit: 0,
    customer: '',
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    if (sale) {
      setFormData({
        ...sale
      });
      setDate(new Date(sale.date));
    } else {
      setFormData({
        itemName: '',
        category: '',
        costPrice: 0,
        salePrice: 0,
        quantity: 0,
        totalSale: 0,
        profit: 0,
        customer: '',
        notes: '',
        date: new Date().toISOString().split('T')[0]
      });
      setDate(new Date());
    }
  }, [sale, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const updatedData = { ...prev, [name]: value };
      
      // Recalculate totals if price or quantity changes
      if (name === 'costPrice' || name === 'salePrice' || name === 'quantity') {
        const costPrice = name === 'costPrice' ? parseFloat(value) : (prev.costPrice || 0);
        const salePrice = name === 'salePrice' ? parseFloat(value) : (prev.salePrice || 0);
        const quantity = name === 'quantity' ? parseInt(value) : (prev.quantity || 0);
        
        updatedData.totalSale = salePrice * quantity;
        updatedData.profit = (salePrice - costPrice) * quantity;
      }
      
      return updatedData;
    });
  };

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      setFormData(prev => ({
        ...prev,
        date: newDate.toISOString().split('T')[0]
      }));
    }
  };

  const handleSubmit = () => {
    if (!formData.itemName || !formData.category) {
      // Show validation errors
      return;
    }
    
    const saleData: Sale = {
      id: sale?.id || `s${Date.now()}`,
      itemId: sale?.itemId || `item-${Date.now()}`,
      date: formData.date || new Date().toISOString().split('T')[0],
      itemName: formData.itemName || '',
      category: formData.category || '',
      costPrice: parseFloat(formData.costPrice?.toString() || '0'),
      salePrice: parseFloat(formData.salePrice?.toString() || '0'),
      quantity: parseInt(formData.quantity?.toString() || '0'),
      totalSale: parseFloat(formData.totalSale?.toString() || '0'),
      profit: parseFloat(formData.profit?.toString() || '0'),
      customer: formData.customer,
      notes: formData.notes
    };
    
    onSave(saleData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-cafe-card border-cafe-border sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{sale ? 'Edit Sale' : 'Add New Sale'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-cafe-background border-cafe-border",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-cafe-card border-cafe-border">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateChange}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="itemName">Item Name</Label>
            <Input 
              id="itemName" 
              name="itemName"
              value={formData.itemName} 
              onChange={handleInputChange} 
              className="bg-cafe-background border-cafe-border"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Input 
              id="category" 
              name="category"
              value={formData.category} 
              onChange={handleInputChange} 
              className="bg-cafe-background border-cafe-border"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="costPrice">Cost Price ($)</Label>
              <Input 
                id="costPrice" 
                name="costPrice"
                type="number" 
                min="0" 
                step="0.01"
                value={formData.costPrice} 
                onChange={handleInputChange} 
                className="bg-cafe-background border-cafe-border"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="salePrice">Sale Price ($)</Label>
              <Input 
                id="salePrice" 
                name="salePrice"
                type="number" 
                min="0" 
                step="0.01"
                value={formData.salePrice} 
                onChange={handleInputChange} 
                className="bg-cafe-background border-cafe-border"
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input 
              id="quantity" 
              name="quantity"
              type="number" 
              min="0" 
              step="1"
              value={formData.quantity} 
              onChange={handleInputChange} 
              className="bg-cafe-background border-cafe-border"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="totalSale">Total Sale ($)</Label>
              <Input 
                id="totalSale" 
                name="totalSale"
                type="number" 
                readOnly 
                value={formData.totalSale} 
                className="bg-cafe-background border-cafe-border"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="profit">Profit ($)</Label>
              <Input 
                id="profit" 
                name="profit"
                type="number" 
                readOnly 
                value={formData.profit} 
                className="bg-cafe-background border-cafe-border"
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="customer">Customer (Optional)</Label>
            <Input 
              id="customer" 
              name="customer"
              value={formData.customer || ''} 
              onChange={handleInputChange} 
              className="bg-cafe-background border-cafe-border"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes" 
              name="notes"
              value={formData.notes || ''} 
              onChange={handleInputChange} 
              className="bg-cafe-background border-cafe-border"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="bg-cafe-background border-cafe-border">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-cafe-accent hover:bg-cafe-accent-light button-glow">
            {sale ? 'Update' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
