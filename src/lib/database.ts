import { supabase } from './supabase';
import { Purchase, Sale } from '@/types/models';

// Purchase Queries
export const getPurchases = async () => {
  const { data, error } = await supabase
    .from('purchases')
    .select('*')
    .order('date', { ascending: false });
  
  if (error) throw error;
  return data as Purchase[];
};

export const addPurchase = async (purchase: Omit<Purchase, 'id'>) => {
  const { data, error } = await supabase
    .from('purchases')
    .insert([purchase])
    .select()
    .single();
  
  if (error) throw error;
  return data as Purchase;
};

export const updatePurchase = async (id: string, purchase: Partial<Purchase>) => {
  const { data, error } = await supabase
    .from('purchases')
    .update(purchase)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Purchase;
};

export const deletePurchase = async (id: string) => {
  const { error } = await supabase
    .from('purchases')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Sales Queries
export const getSales = async () => {
  const { data, error } = await supabase
    .from('sales')
    .select('*')
    .order('date', { ascending: false });
  
  if (error) throw error;
  return data as Sale[];
};

export const addSale = async (sale: Omit<Sale, 'id'>) => {
  const { data, error } = await supabase
    .from('sales')
    .insert([sale])
    .select()
    .single();
  
  if (error) throw error;
  return data as Sale;
};

export const updateSale = async (id: string, sale: Partial<Sale>) => {
  const { data, error } = await supabase
    .from('sales')
    .update(sale)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Sale;
};

export const deleteSale = async (id: string) => {
  const { error } = await supabase
    .from('sales')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Settings Queries
export const getSettings = async () => {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .single();
  
  if (error) throw error;
  return data;
};

export const updateSettings = async (settings: any) => {
  const { data, error } = await supabase
    .from('settings')
    .update(settings)
    .eq('id', 1)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}; 