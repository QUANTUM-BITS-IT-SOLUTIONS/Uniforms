// Mock Data for Uniform Production & Worker Management Dashboard

export interface Worker {
  id: string;
  name: string;
  phone: string;
  bankUpi: string;
}

export interface DimensionRange {
  label: string;
  min: number;
  max: number;
  unit: string;
}

export type SizeLabel = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface SizeChartEntry {
  size: SizeLabel;
  measurements: Record<string, number>; // dimension label -> value
}

export interface UniformItem {
  id: string;
  name: string;
  dimensions: DimensionRange[];
  rate: number;
  sizeChart?: SizeChartEntry[];
}

export interface Order {
  id: string;
  name: string;
  date: string;
  totalPieces: number;
  status: 'In Progress' | 'Completed';
  shirts: number;
  pants: number;
  blazers: number;
}

export interface WorkerProduction {
  workerId: string;
  workerName: string;
  assigned: number;
  completed: number;
  shirts: { assigned: number; completed: number };
  pants: { assigned: number; completed: number };
  blazers: { assigned: number; completed: number };
}

export interface WorkerPayment {
  workerId: string;
  workerName: string;
  shirts: number;
  pants: number;
  blazers: number;
  totalEarnings: number;
}

// 20 Workers with Indian names
export const workers: Worker[] = [
  { id: 'W001', name: 'Ramesh Kumar', phone: '9876543210', bankUpi: 'GPay' },
  { id: 'W002', name: 'Suresh Singh', phone: '9876543220', bankUpi: 'PhonePe' },
  { id: 'W003', name: 'Mahesh Sharma', phone: '9876543230', bankUpi: '' },
  { id: 'W004', name: 'Rajesh Patel', phone: '9876543240', bankUpi: 'GPay' },
  { id: 'W005', name: 'Dinesh Gupta', phone: '9876543250', bankUpi: 'Paytm' },
  { id: 'W006', name: 'Ganesh Yadav', phone: '9876543260', bankUpi: 'PhonePe' },
  { id: 'W007', name: 'Nilesh Verma', phone: '9876543270', bankUpi: '' },
  { id: 'W008', name: 'Prakash Joshi', phone: '9876543280', bankUpi: 'GPay' },
  { id: 'W009', name: 'Vikash Mishra', phone: '9876543290', bankUpi: 'Paytm' },
  { id: 'W010', name: 'Ashok Pandey', phone: '9876543300', bankUpi: 'PhonePe' },
  { id: 'W011', name: 'Santosh Tiwari', phone: '9876543310', bankUpi: 'GPay' },
  { id: 'W012', name: 'Anil Chauhan', phone: '9876543320', bankUpi: '' },
  { id: 'W013', name: 'Vinod Rawat', phone: '9876543330', bankUpi: 'Paytm' },
  { id: 'W014', name: 'Manoj Negi', phone: '9876543340', bankUpi: 'GPay' },
  { id: 'W015', name: 'Kamal Bisht', phone: '9876543350', bankUpi: 'PhonePe' },
  { id: 'W016', name: 'Ravi Thapa', phone: '9876543360', bankUpi: '' },
  { id: 'W017', name: 'Deepak Bhandari', phone: '9876543370', bankUpi: 'GPay' },
  { id: 'W018', name: 'Sanjay Karki', phone: '9876543380', bankUpi: 'Paytm' },
  { id: 'W019', name: 'Pankaj Adhikari', phone: '9876543390', bankUpi: 'PhonePe' },
  { id: 'W020', name: 'Umesh Rana', phone: '9876543400', bankUpi: 'GPay' },
];

// Uniform Items
export const uniformItems: UniformItem[] = [
  {
    id: 'I001', name: 'Shirt', rate: 120,
    dimensions: [
      { label: 'Chest', min: 28, max: 42, unit: 'in' },
      { label: 'Length', min: 22, max: 30, unit: 'in' },
      { label: 'Sleeve', min: 18, max: 24, unit: 'in' },
    ],
    sizeChart: [
      { size: 'S', measurements: { Chest: 28, Length: 22, Sleeve: 18 } },
      { size: 'M', measurements: { Chest: 32, Length: 24, Sleeve: 20 } },
      { size: 'L', measurements: { Chest: 36, Length: 26, Sleeve: 22 } },
      { size: 'XL', measurements: { Chest: 40, Length: 28, Sleeve: 23 } },
      { size: 'XXL', measurements: { Chest: 42, Length: 30, Sleeve: 24 } },
    ],
  },
  {
    id: 'I002', name: 'Pant', rate: 140,
    dimensions: [
      { label: 'Waist', min: 22, max: 36, unit: 'in' },
      { label: 'Length', min: 30, max: 42, unit: 'in' },
      { label: 'Inseam', min: 22, max: 32, unit: 'in' },
    ],
    sizeChart: [
      { size: 'S', measurements: { Waist: 22, Length: 30, Inseam: 22 } },
      { size: 'M', measurements: { Waist: 28, Length: 34, Inseam: 26 } },
      { size: 'L', measurements: { Waist: 32, Length: 38, Inseam: 28 } },
      { size: 'XL', measurements: { Waist: 34, Length: 40, Inseam: 30 } },
      { size: 'XXL', measurements: { Waist: 36, Length: 42, Inseam: 32 } },
    ],
  },
  {
    id: 'I003', name: 'Blazer', rate: 260,
    dimensions: [
      { label: 'Chest', min: 30, max: 44, unit: 'in' },
      { label: 'Shoulder', min: 14, max: 19, unit: 'in' },
      { label: 'Length', min: 24, max: 32, unit: 'in' },
    ],
    sizeChart: [
      { size: 'S', measurements: { Chest: 30, Shoulder: 14, Length: 24 } },
      { size: 'M', measurements: { Chest: 34, Shoulder: 16, Length: 26 } },
      { size: 'L', measurements: { Chest: 38, Shoulder: 17, Length: 28 } },
      { size: 'XL', measurements: { Chest: 42, Shoulder: 18, Length: 30 } },
      { size: 'XXL', measurements: { Chest: 44, Shoulder: 19, Length: 32 } },
    ],
  },
];

// Recent Orders
export const orders: Order[] = [
  { id: 'O001', name: 'Delhi Public School Order', date: '2024-01-15', totalPieces: 1600, status: 'In Progress', shirts: 800, pants: 600, blazers: 200 },
  { id: 'O002', name: 'St. Mary\'s Convent Order', date: '2024-01-10', totalPieces: 1200, status: 'Completed', shirts: 600, pants: 400, blazers: 200 },
  { id: 'O003', name: 'Army Public School Order', date: '2024-01-05', totalPieces: 800, status: 'Completed', shirts: 400, pants: 300, blazers: 100 },
  { id: 'O004', name: 'Kendriya Vidyalaya Order', date: '2023-12-28', totalPieces: 2000, status: 'Completed', shirts: 1000, pants: 700, blazers: 300 },
  { id: 'O005', name: 'Ryan International Order', date: '2023-12-20', totalPieces: 1000, status: 'Completed', shirts: 500, pants: 350, blazers: 150 },
];

// Worker Productivity Data for Chart
export const workerProductivityData = [
  { name: 'Ramesh', pieces: 320 },
  { name: 'Suresh', pieces: 280 },
  { name: 'Mahesh', pieces: 340 },
  { name: 'Rajesh', pieces: 260 },
  { name: 'Dinesh', pieces: 300 },
  { name: 'Ganesh', pieces: 290 },
  { name: 'Nilesh', pieces: 310 },
  { name: 'Prakash', pieces: 275 },
];

// Production Tracking Data
export const productionData: WorkerProduction[] = workers.map((worker, index) => ({
  workerId: worker.id,
  workerName: worker.name,
  assigned: 120,
  completed: Math.floor(70 + Math.random() * 50),
  shirts: { assigned: 40, completed: Math.floor(25 + Math.random() * 15) },
  pants: { assigned: 30, completed: Math.floor(20 + Math.random() * 10) },
  blazers: { assigned: 10, completed: Math.floor(5 + Math.random() * 5) },
}));

// Monthly Payment Data
export const monthlyPaymentData: WorkerPayment[] = workers.map((worker) => {
  const shirts = Math.floor(280 + Math.random() * 80);
  const pants = Math.floor(180 + Math.random() * 60);
  const blazers = Math.floor(40 + Math.random() * 40);
  return {
    workerId: worker.id,
    workerName: worker.name,
    shirts,
    pants,
    blazers,
    totalEarnings: shirts * 120 + pants * 140 + blazers * 260,
  };
});

// Dashboard Statistics
export const dashboardStats = {
  totalOrders: 5,
  totalWorkers: 20,
  piecesAssigned: 2400,
  piecesCompleted: 1820,
  estimatedPayout: 218400,
  completionRate: 76,
};

// Format currency in Indian Rupees
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
