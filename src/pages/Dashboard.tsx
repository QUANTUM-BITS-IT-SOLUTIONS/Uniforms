import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  ClipboardList, 
  Users, 
  Package, 
  CheckCircle, 
  IndianRupee, 
  TrendingUp,
  Search
} from 'lucide-react';
import { 
  dashboardStats, 
  orders, 
  workerProductivityData, 
  formatCurrency 
} from '@/data/mockData';

const statCards = [
  { 
    title: 'Total Orders', 
    value: dashboardStats.totalOrders, 
    icon: ClipboardList,
    format: (v: number) => v.toString(),
    accent: 'primary' as const,
  },
  { 
    title: 'Total Workers', 
    value: dashboardStats.totalWorkers, 
    icon: Users,
    format: (v: number) => v.toString(),
    accent: 'primary' as const,
  },
  { 
    title: 'Pieces Assigned', 
    value: dashboardStats.piecesAssigned, 
    icon: Package,
    format: (v: number) => v.toLocaleString('en-IN'),
    accent: 'warning' as const,
  },
  { 
    title: 'Pieces Completed', 
    value: dashboardStats.piecesCompleted, 
    icon: CheckCircle,
    format: (v: number) => v.toLocaleString('en-IN'),
    accent: 'success' as const,
  },
  { 
    title: 'Est. Monthly Payout', 
    value: dashboardStats.estimatedPayout, 
    icon: IndianRupee,
    format: (v: number) => formatCurrency(v),
    accent: 'primary' as const,
  },
  { 
    title: 'Completion Rate', 
    value: dashboardStats.completionRate, 
    icon: TrendingUp,
    format: (v: number) => `${v}%`,
    accent: 'success' as const,
  },
];

const accentStyles = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
};

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat, i) => (
          <Card 
            key={stat.title} 
            className="group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {stat.title}
              </CardTitle>
              <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${accentStyles[stat.accent]}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold tracking-tight">{stat.format(stat.value)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Worker Productivity</CardTitle>
          <p className="text-xs text-muted-foreground">Pieces completed per worker this month</p>
        </CardHeader>
        <CardContent>
          <div className="h-[220px] sm:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workerProductivityData} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} 
                  width={40} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.75rem',
                    boxShadow: '0 4px 12px hsl(var(--foreground) / 0.08)',
                    fontSize: '13px',
                  }}
                  cursor={{ fill: 'hsl(var(--muted) / 0.5)' }}
                />
                <Bar 
                  dataKey="pieces" 
                  fill="hsl(var(--primary))" 
                  radius={[6, 6, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-lg border overflow-x-auto">
            <Table className="min-w-[450px]">
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="min-w-[150px] font-semibold text-xs uppercase tracking-wide">Order Name</TableHead>
                  <TableHead className="w-24 font-semibold text-xs uppercase tracking-wide">Date</TableHead>
                  <TableHead className="text-right w-20 font-semibold text-xs uppercase tracking-wide">Pieces</TableHead>
                  <TableHead className="w-28 font-semibold text-xs uppercase tracking-wide">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="group">
                    <TableCell className="font-medium text-sm">{order.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString('en-IN')}</TableCell>
                    <TableCell className="text-right text-sm font-medium">{order.totalPieces.toLocaleString('en-IN')}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary"
                        className={`text-xs font-medium ${
                          order.status === 'Completed' 
                            ? 'bg-success/10 text-success border-success/20' 
                            : 'bg-warning/10 text-warning border-warning/20'
                        }`}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredOrders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-12">
                      No orders found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
