
import { 
  FinancialSummary,
  MonthlyTrend,
  ItemSummary,
  Transaction,
  Purchase,
  Sale
} from '@/types/models';

// Mock Financial Summary
export const getFinancialSummary = (): FinancialSummary => ({
  totalExpenses: 12450.75,
  totalEarnings: 23780.50,
  netProfit: 11329.75,
  expenseChange: 8.2,
  earningsChange: 12.5,
  profitChange: 15.8
});

// Mock Monthly Trends
export const getMonthlyTrends = (): MonthlyTrend[] => [
  { month: "Jan", expenses: 7800, earnings: 12500 },
  { month: "Feb", expenses: 8200, earnings: 13800 },
  { month: "Mar", expenses: 7500, earnings: 15200 },
  { month: "Apr", expenses: 8500, earnings: 16500 },
  { month: "May", expenses: 9200, earnings: 18100 },
  { month: "Jun", expenses: 10100, earnings: 19300 },
  { month: "Jul", expenses: 9700, earnings: 21200 },
  { month: "Aug", expenses: 11200, earnings: 22800 },
  { month: "Sep", expenses: 12450, earnings: 23780 },
];

// Mock Top Purchased Items
export const getTopPurchasedItems = (): ItemSummary[] => [
  { name: "Coffee Beans", value: 3200, color: "#316BF0" },
  { name: "Milk", value: 2100, color: "#4C7FF5" },
  { name: "Sugar", value: 1250, color: "#7C9DF7" },
  { name: "Cups", value: 950, color: "#A4BCF9" },
  { name: "Syrups", value: 850, color: "#C7D7FB" },
  { name: "Others", value: 1200, color: "#E6EFFE" },
];

// Mock Top Sold Items
export const getTopSoldItems = (): ItemSummary[] => [
  { name: "Espresso", value: 6500 },
  { name: "Latte", value: 5200 },
  { name: "Cappuccino", value: 4700 },
  { name: "Cold Brew", value: 3800 },
  { name: "Pastries", value: 2900 },
  { name: "Sandwiches", value: 2100 },
];

// Mock Recent Transactions
export const getRecentTransactions = (): Transaction[] => [
  { 
    id: "t1", 
    date: "2023-09-12", 
    type: "purchase", 
    itemName: "Coffee Beans (Arabica)", 
    quantity: 20, 
    price: 15.50, 
    total: 310.00, 
    supplier: "Bean Masters Co." 
  },
  { 
    id: "t2", 
    date: "2023-09-12", 
    type: "sale", 
    itemName: "Latte", 
    quantity: 42, 
    price: 4.50, 
    total: 189.00 
  },
  { 
    id: "t3", 
    date: "2023-09-11", 
    type: "purchase", 
    itemName: "Whole Milk", 
    quantity: 50, 
    price: 2.75, 
    total: 137.50, 
    supplier: "Dairy Deluxe" 
  },
  { 
    id: "t4", 
    date: "2023-09-11", 
    type: "sale", 
    itemName: "Cappuccino", 
    quantity: 38, 
    price: 4.25, 
    total: 161.50 
  },
  { 
    id: "t5", 
    date: "2023-09-10", 
    type: "purchase", 
    itemName: "To-Go Cups (16oz)", 
    quantity: 500, 
    price: 0.12, 
    total: 60.00, 
    supplier: "Packaging Pro" 
  },
  { 
    id: "t6", 
    date: "2023-09-10", 
    type: "sale", 
    itemName: "Croissant", 
    quantity: 25, 
    price: 3.50, 
    total: 87.50 
  },
];

// Mock Purchases Data
export const getPurchases = (): Purchase[] => [
  {
    id: "p1",
    date: "2023-09-12",
    itemId: "item-001",
    itemName: "Coffee Beans (Arabica)",
    category: "Ingredients",
    unitPrice: 15.50,
    quantity: 20,
    totalCost: 310.00,
    supplier: "Bean Masters Co.",
    notes: "Premium grade Arabica beans"
  },
  {
    id: "p2",
    date: "2023-09-11",
    itemId: "item-002",
    itemName: "Whole Milk",
    category: "Ingredients",
    unitPrice: 2.75,
    quantity: 50,
    totalCost: 137.50,
    supplier: "Dairy Deluxe",
    notes: "Organic whole milk"
  },
  {
    id: "p3",
    date: "2023-09-10",
    itemId: "item-003",
    itemName: "To-Go Cups (16oz)",
    category: "Supplies",
    unitPrice: 0.12,
    quantity: 500,
    totalCost: 60.00,
    supplier: "Packaging Pro",
    notes: "Recyclable cups"
  },
  {
    id: "p4",
    date: "2023-09-09",
    itemId: "item-004",
    itemName: "Sugar",
    category: "Ingredients",
    unitPrice: 1.25,
    quantity: 40,
    totalCost: 50.00,
    supplier: "Sweet Supply Co.",
    notes: "Refined white sugar"
  },
  {
    id: "p5",
    date: "2023-09-08",
    itemId: "item-005",
    itemName: "Vanilla Syrup",
    category: "Ingredients",
    unitPrice: 8.50,
    quantity: 10,
    totalCost: 85.00,
    supplier: "Flavor Craft",
    notes: "Natural vanilla syrup"
  },
  {
    id: "p6",
    date: "2023-09-07",
    itemId: "item-006",
    itemName: "Napkins",
    category: "Supplies",
    unitPrice: 0.02,
    quantity: 2000,
    totalCost: 40.00,
    supplier: "Packaging Pro",
    notes: "Recycled paper napkins"
  },
  {
    id: "p7",
    date: "2023-09-06",
    itemId: "item-007",
    itemName: "Coffee Filters",
    category: "Supplies",
    unitPrice: 0.05,
    quantity: 1000,
    totalCost: 50.00,
    supplier: "Barista Supplies",
    notes: "Standard size filters"
  },
  {
    id: "p8",
    date: "2023-09-05",
    itemId: "item-008",
    itemName: "Chocolate Powder",
    category: "Ingredients",
    unitPrice: 12.00,
    quantity: 5,
    totalCost: 60.00,
    supplier: "Sweet Supply Co.",
    notes: "Premium cocoa powder"
  },
  {
    id: "p9",
    date: "2023-09-04",
    itemId: "item-009",
    itemName: "Caramel Syrup",
    category: "Ingredients",
    unitPrice: 8.50,
    quantity: 8,
    totalCost: 68.00,
    supplier: "Flavor Craft",
    notes: "Buttery caramel syrup"
  },
  {
    id: "p10",
    date: "2023-09-03",
    itemId: "item-010",
    itemName: "Straws",
    category: "Supplies",
    unitPrice: 0.01,
    quantity: 3000,
    totalCost: 30.00,
    supplier: "Packaging Pro",
    notes: "Eco-friendly paper straws"
  },
];

// Mock Sales Data
export const getSales = (): Sale[] => [
  {
    id: "s1",
    date: "2023-09-12",
    itemId: "item-101",
    itemName: "Latte",
    category: "Drinks",
    costPrice: 1.20,
    salePrice: 4.50,
    quantity: 42,
    totalSale: 189.00,
    profit: 138.60
  },
  {
    id: "s2",
    date: "2023-09-11",
    itemId: "item-102",
    itemName: "Cappuccino",
    category: "Drinks",
    costPrice: 1.15,
    salePrice: 4.25,
    quantity: 38,
    totalSale: 161.50,
    profit: 117.80
  },
  {
    id: "s3",
    date: "2023-09-10",
    itemId: "item-103",
    itemName: "Croissant",
    category: "Food",
    costPrice: 1.25,
    salePrice: 3.50,
    quantity: 25,
    totalSale: 87.50,
    profit: 56.25
  },
  {
    id: "s4",
    date: "2023-09-09",
    itemId: "item-104",
    itemName: "Espresso",
    category: "Drinks",
    costPrice: 0.75,
    salePrice: 3.00,
    quantity: 56,
    totalSale: 168.00,
    profit: 126.00
  },
  {
    id: "s5",
    date: "2023-09-08",
    itemId: "item-105",
    itemName: "Muffin",
    category: "Food",
    costPrice: 1.50,
    salePrice: 3.75,
    quantity: 22,
    totalSale: 82.50,
    profit: 49.50
  },
  {
    id: "s6",
    date: "2023-09-07",
    itemId: "item-106",
    itemName: "Iced Coffee",
    category: "Drinks",
    costPrice: 1.00,
    salePrice: 4.00,
    quantity: 33,
    totalSale: 132.00,
    profit: 99.00
  },
  {
    id: "s7",
    date: "2023-09-06",
    itemId: "item-107",
    itemName: "Sandwich",
    category: "Food",
    costPrice: 2.50,
    salePrice: 6.50,
    quantity: 18,
    totalSale: 117.00,
    profit: 72.00
  },
  {
    id: "s8",
    date: "2023-09-05",
    itemId: "item-108",
    itemName: "Hot Chocolate",
    category: "Drinks",
    costPrice: 1.30,
    salePrice: 4.25,
    quantity: 24,
    totalSale: 102.00,
    profit: 70.80
  },
  {
    id: "s9",
    date: "2023-09-04",
    itemId: "item-109",
    itemName: "Cheesecake",
    category: "Food",
    costPrice: 2.00,
    salePrice: 5.00,
    quantity: 15,
    totalSale: 75.00,
    profit: 45.00
  },
  {
    id: "s10",
    date: "2023-09-03",
    itemId: "item-110",
    itemName: "Mocha",
    category: "Drinks",
    costPrice: 1.40,
    salePrice: 4.75,
    quantity: 27,
    totalSale: 128.25,
    profit: 90.45
  },
];
