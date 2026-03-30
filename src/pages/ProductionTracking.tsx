import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Plus, Minus } from 'lucide-react';
import { productionData as initialData, WorkerProduction } from '@/data/mockData';

export default function ProductionTracking() {
  const [production, setProduction] = useLocalStorage<WorkerProduction[]>('app_production', initialData);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProduction = production.filter(p =>
    p.workerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateCompleted = (workerId: string, delta: number) => {
    setProduction(production.map(p => {
      if (p.workerId === workerId) {
        const newCompleted = Math.max(0, Math.min(p.assigned, p.completed + delta));
        return { ...p, completed: newCompleted };
      }
      return p;
    }));
  };

  const getStatus = (assigned: number, completed: number) => {
    const pending = assigned - completed;
    if (pending === 0) {
      return { label: 'Completed', variant: 'default' as const, emoji: '🟢' };
    }
    return { label: 'In Progress', variant: 'secondary' as const, emoji: '🟡' };
  };

  // Calculate totals
  const totals = production.reduce(
    (acc, p) => ({
      assigned: acc.assigned + p.assigned,
      completed: acc.completed + p.completed,
    }),
    { assigned: 0, completed: 0 }
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total Assigned</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tracking-tight">{totals.assigned.toLocaleString('en-IN')}</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tracking-tight text-success">{totals.completed.toLocaleString('en-IN')}</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tracking-tight text-warning">{(totals.assigned - totals.completed).toLocaleString('en-IN')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Production Table */}
      <Card>
        <CardHeader>
          <CardTitle>Production Progress</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by worker name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Table */}
          <div className="rounded-md border overflow-x-auto">
            <Table className="min-w-[600px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[120px]">Worker</TableHead>
                  <TableHead className="text-right w-20">Assigned</TableHead>
                  <TableHead className="text-center min-w-[140px]">Completed</TableHead>
                  <TableHead className="text-right w-20">Pending</TableHead>
                  <TableHead className="text-center min-w-[120px]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProduction.map((p) => {
                  const pending = p.assigned - p.completed;
                  const status = getStatus(p.assigned, p.completed);
                  
                  return (
                    <TableRow key={p.workerId}>
                      <TableCell className="font-medium whitespace-nowrap">{p.workerName}</TableCell>
                      <TableCell className="text-right">{p.assigned}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-1 sm:gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 sm:h-8 sm:w-8"
                            onClick={() => updateCompleted(p.workerId, -1)}
                            disabled={p.completed === 0}
                          >
                            <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <span className="w-10 sm:w-12 text-center font-medium text-sm">{p.completed}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 sm:h-8 sm:w-8"
                            onClick={() => updateCompleted(p.workerId, 1)}
                            disabled={p.completed >= p.assigned}
                          >
                            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">{pending}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary" className={`text-xs font-medium ${status.emoji === '🟢' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                          {status.emoji} <span className="hidden sm:inline">{status.label}</span>
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filteredProduction.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      No workers found
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
