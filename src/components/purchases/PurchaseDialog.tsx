
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
import { Purchase } from '@/types/models';

interface PurchaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (purchase: Purchase) => void;
  purchase?: Purchase;
}

export function PurchaseDialog({ isOpen, onClose, onSave, purchase }: PurchaseDialogProps) {
  const [formData, setFormData] = useState<Partial<Purchase>>({
    itemName: '',
    category: '',
    unitPrice: 0,
    quantity: 0,
    totalCost: 0,
    supplier: '',
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    if (purchase) {
      setFormData({
        ...purchase
      });
      setDate(new Date(purchase.date));
    } else {
      setFormData({
        itemName: '',
        category: '',
        unitPrice: 0,
        quantity: 0,
        totalCost: 0,
        supplier: '',
        notes: '',
        date: new Date().toISOString().split('T')[0]
      });
      setDate(new Date());
    }
  }, [purchase, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const updatedData = { ...prev, [name]: value };
      
      // Recalculate total cost if unit price or quantity changes
      if (name === 'unitPrice' || name === 'quantity') {
        const unitPrice = name === 'unitPrice' ? parseFloat(value) : (prev.unitPrice || 0);
        const quantity = name === 'quantity' ? parseInt(value) : (prev.quantity || 0);
        
        updatedData.totalCost = unitPrice * quantity;
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
    if (!formData.itemName || !formData.supplier || !formData.category) {
      // Show validation errors
      return;
    }
    
    const purchaseData: Purchase = {
      id: purchase?.id || `p${Date.now()}`,
      itemId: purchase?.itemId || `item-${Date.now()}`,
      date: formData.date || new Date().toISOString().split('T')[0],
      itemName: formData.itemName || '',
      category: formData.category || '',
      unitPrice: parseFloat(formData.unitPrice?.toString() || '0'),
      quantity: parseInt(formData.quantity?.toString() || '0'),
      totalCost: parseFloat(formData.totalCost?.toString() || '0'),
      supplier: formData.supplier || '',
      notes: formData.notes
    };
    
    onSave(purchaseData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-cafe-card border-cafe-border sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{purchase ? 'Edit Purchase' : 'Add New Purchase'}</DialogTitle>
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
              <Label htmlFor="unitPrice">Unit Price ($)</Label>
              <Input 
                id="unitPrice" 
                name="unitPrice"
                type="number" 
                min="0" 
                step="0.01"
                value={formData.unitPrice} 
                onChange={handleInputChange} 
                className="bg-cafe-background border-cafe-border"
              />
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
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="totalCost">Total Cost ($)</Label>
            <Input 
              id="totalCost" 
              name="totalCost"
              type="number" 
              readOnly 
              value={formData.totalCost} 
              className="bg-cafe-background border-cafe-border"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="supplier">Supplier</Label>
            <Input 
              id="supplier" 
              name="supplier"
              value={formData.supplier} 
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
            {purchase ? 'Update' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
