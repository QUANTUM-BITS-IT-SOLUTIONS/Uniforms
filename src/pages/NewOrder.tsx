import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Package, IndianRupee, CheckCircle2, Shirt } from 'lucide-react';
import { workers, uniformItems, formatCurrency } from '@/data/mockData';

interface WorkAllocation {
  workerId: string;
  workerName: string;
  shirts: number;
  pants: number;
  blazers: number;
  total: number;
}

export default function NewOrder() {
  const [orderName, setOrderName] = useState('');
  const [shirts, setShirts] = useState(800);
  const [pants, setPants] = useState(600);
  const [blazers, setBlazers] = useState(200);
  const [isDistributed, setIsDistributed] = useState(false);
  const [allocations, setAllocations] = useState<WorkAllocation[]>([]);

  const shirtRate = uniformItems.find(i => i.name === 'Shirt')?.rate || 120;
  const pantRate = uniformItems.find(i => i.name === 'Pant')?.rate || 140;
  const blazerRate = uniformItems.find(i => i.name === 'Blazer')?.rate || 260;

  // Live calculations
  const summary = useMemo(() => {
    const totalPieces = shirts + pants + blazers;
    const estimatedPayout = (shirts * shirtRate) + (pants * pantRate) + (blazers * blazerRate);
    return { totalPieces, estimatedPayout };
  }, [shirts, pants, blazers, shirtRate, pantRate, blazerRate]);

  const handleAutoSplit = () => {
    const workerCount = workers.length;
    const shirtsPerWorker = Math.floor(shirts / workerCount);
    const pantsPerWorker = Math.floor(pants / workerCount);
    const blazersPerWorker = Math.floor(blazers / workerCount);

    const newAllocations: WorkAllocation[] = workers.map((worker, index) => {
      // Add remainder to first workers
      const extraShirts = index < (shirts % workerCount) ? 1 : 0;
      const extraPants = index < (pants % workerCount) ? 1 : 0;
      const extraBlazers = index < (blazers % workerCount) ? 1 : 0;

      const workerShirts = shirtsPerWorker + extraShirts;
      const workerPants = pantsPerWorker + extraPants;
      const workerBlazers = blazersPerWorker + extraBlazers;

      return {
        workerId: worker.id,
        workerName: worker.name,
        shirts: workerShirts,
        pants: workerPants,
        blazers: workerBlazers,
        total: workerShirts + workerPants + workerBlazers,
      };
    });

    setAllocations(newAllocations);
    setIsDistributed(true);
  };

  const handleReset = () => {
    setIsDistributed(false);
    setAllocations([]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Create New Order</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="orderName">Order Name</Label>
              <Input
                id="orderName"
                value={orderName}
                onChange={(e) => setOrderName(e.target.value)}
                placeholder="e.g., Delhi Public School Order"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="shirts" className="flex items-center gap-2">
                  <Shirt className="h-4 w-4" />
                  Shirts
                </Label>
                <Input
                  id="shirts"
                  type="number"
                  value={shirts}
                  onChange={(e) => setShirts(Number(e.target.value) || 0)}
                  min={0}
                />
                <p className="text-xs text-muted-foreground">{formatCurrency(shirtRate)} per piece</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pants" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Pants
                </Label>
                <Input
                  id="pants"
                  type="number"
                  value={pants}
                  onChange={(e) => setPants(Number(e.target.value) || 0)}
                  min={0}
                />
                <p className="text-xs text-muted-foreground">{formatCurrency(pantRate)} per piece</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="blazers" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Blazers
                </Label>
                <Input
                  id="blazers"
                  type="number"
                  value={blazers}
                  onChange={(e) => setBlazers(Number(e.target.value) || 0)}
                  min={0}
                />
                <p className="text-xs text-muted-foreground">{formatCurrency(blazerRate)} per piece</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={handleAutoSplit} 
                disabled={summary.totalPieces === 0}
                className="flex-1 sm:flex-none"
              >
                Auto-Split Work
              </Button>
              {isDistributed && (
                <Button variant="outline" onClick={handleReset}>
                  Reset
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Order Summary Card */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Shirts</span>
                <span className="font-medium">{shirts.toLocaleString('en-IN')} pcs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Pants</span>
                <span className="font-medium">{pants.toLocaleString('en-IN')} pcs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Blazers</span>
                <span className="font-medium">{blazers.toLocaleString('en-IN')} pcs</span>
              </div>
            </div>
            
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Pieces</span>
                <span className="text-xl font-bold">{summary.totalPieces.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium flex items-center gap-1">
                  <IndianRupee className="h-4 w-4" />
                  Est. Payout
                </span>
                <span className="text-xl font-bold text-primary">
                  {formatCurrency(summary.estimatedPayout)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Success Alert */}
      {isDistributed && (
        <Alert className="bg-success/10 border-success/20">
          <CheckCircle2 className="h-5 w-5 text-success" />
          <AlertTitle className="text-success">Work Successfully Distributed</AlertTitle>
          <AlertDescription className="text-success/80">
            Work has been distributed among {workers.length} workers equally.
          </AlertDescription>
        </Alert>
      )}

      {/* Allocation Table */}
      {isDistributed && allocations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Work Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table className="min-w-[400px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[120px]">Worker</TableHead>
                    <TableHead className="text-right w-16">Shirts</TableHead>
                    <TableHead className="text-right w-16">Pants</TableHead>
                    <TableHead className="text-right w-16">Blazers</TableHead>
                    <TableHead className="text-right w-16">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allocations.map((allocation) => (
                    <TableRow key={allocation.workerId}>
                      <TableCell className="font-medium text-sm whitespace-nowrap">{allocation.workerName}</TableCell>
                      <TableCell className="text-right text-sm">{allocation.shirts}</TableCell>
                      <TableCell className="text-right text-sm">{allocation.pants}</TableCell>
                      <TableCell className="text-right text-sm">{allocation.blazers}</TableCell>
                      <TableCell className="text-right font-semibold text-sm">{allocation.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
