import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileDown, Trophy, TrendingDown, IndianRupee } from 'lucide-react';
import { monthlyPaymentData, uniformItems, formatCurrency } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const months = [
  'January 2024',
  'February 2024',
  'March 2024',
  'April 2024',
  'May 2024',
  'June 2024',
];

export default function MonthlyPayments() {
  const [selectedMonth, setSelectedMonth] = useState('January 2024');
  const { toast } = useToast();

  const shirtRate = uniformItems.find(i => i.name === 'Shirt')?.rate || 120;
  const pantRate = uniformItems.find(i => i.name === 'Pant')?.rate || 140;
  const blazerRate = uniformItems.find(i => i.name === 'Blazer')?.rate || 260;

  const sortedPayments = useMemo(() => {
    return [...monthlyPaymentData].sort((a, b) => b.totalEarnings - a.totalEarnings);
  }, []);

  const totalPayout = sortedPayments.reduce((sum, p) => sum + p.totalEarnings, 0);
  const topPerformer = sortedPayments[0];
  const leastPerformer = sortedPayments[sortedPayments.length - 1];

  const handleDownload = (type: 'pdf' | 'excel') => {
    toast({
      title: `Download ${type.toUpperCase()}`,
      description: `${type.toUpperCase()} report for ${selectedMonth} would be downloaded here.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Month Select */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Monthly Payments Report</h2>
          <p className="text-muted-foreground">View worker earnings and download reports</p>
        </div>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month} value={month}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-primary/5 border-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-2 uppercase tracking-wide text-muted-foreground">
              <IndianRupee className="h-4 w-4 text-primary" />
              Total Monthly Payout
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary tracking-tight">{formatCurrency(totalPayout)}</p>
          </CardContent>
        </Card>

        <Card className="bg-success/5 border-success/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-2 text-muted-foreground uppercase tracking-wide">
              <Trophy className="h-4 w-4 text-success" />
              Top Performer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-foreground">{topPerformer.workerName}</p>
            <p className="text-sm text-success">{formatCurrency(topPerformer.totalEarnings)}</p>
          </CardContent>
        </Card>

        <Card className="bg-warning/5 border-warning/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-2 text-muted-foreground uppercase tracking-wide">
              <TrendingDown className="h-4 w-4 text-warning" />
              Least Performer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-foreground">{leastPerformer.workerName}</p>
            <p className="text-sm text-warning">{formatCurrency(leastPerformer.totalEarnings)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Download Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" className="flex-1 sm:flex-none" onClick={() => handleDownload('pdf')}>
          <FileDown className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
        <Button variant="outline" className="flex-1 sm:flex-none" onClick={() => handleDownload('excel')}>
          <FileDown className="h-4 w-4 mr-2" />
          Download Excel
        </Button>
      </div>

      {/* Worker Payment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedPayments.map((payment, index) => (
          <Card key={payment.workerId} className="relative overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            {index === 0 && (
              <div className="absolute top-2 right-2">
                <Badge className="bg-success text-success-foreground">
                  <Trophy className="h-3 w-3 mr-1" />
                  Top
                </Badge>
              </div>
            )}
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{payment.workerName}</CardTitle>
              <p className="text-xs text-muted-foreground">{payment.workerId}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between gap-2">
                  <span className="text-muted-foreground truncate">Shirts ({payment.shirts} × ₹{shirtRate})</span>
                  <span className="font-medium shrink-0">{formatCurrency(payment.shirts * shirtRate)}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-muted-foreground truncate">Pants ({payment.pants} × ₹{pantRate})</span>
                  <span className="font-medium shrink-0">{formatCurrency(payment.pants * pantRate)}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-muted-foreground truncate">Blazers ({payment.blazers} × ₹{blazerRate})</span>
                  <span className="font-medium shrink-0">{formatCurrency(payment.blazers * blazerRate)}</span>
                </div>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Earnings</span>
                  <span className="text-lg font-bold text-primary">
                    {formatCurrency(payment.totalEarnings)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
