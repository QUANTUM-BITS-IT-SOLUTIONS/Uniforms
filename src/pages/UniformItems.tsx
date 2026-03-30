import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Ruler } from 'lucide-react';
import { uniformItems as initialItems, UniformItem, DimensionRange, SizeChartEntry, SizeLabel, formatCurrency } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const emptyDimension = (): DimensionRange => ({ label: '', min: 0, max: 0, unit: 'in' });

export default function UniformItems() {
  const [items, setItems] = useLocalStorage<UniformItem[]>('app_uniform_items', initialItems);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<UniformItem | null>(null);
  const [name, setName] = useState('');
  const [rate, setRate] = useState('');
  const [dims, setDims] = useState<DimensionRange[]>([emptyDimension()]);
  const { toast } = useToast();

  const resetForm = () => {
    setName('');
    setRate('');
    setDims([emptyDimension()]);
  };

  const updateDim = (index: number, field: keyof DimensionRange, value: string | number) => {
    setDims(dims.map((d, i) => i === index ? { ...d, [field]: field === 'min' || field === 'max' ? Number(value) : value } : d));
  };

  const addDimRow = () => setDims([...dims, emptyDimension()]);
  const removeDimRow = (index: number) => setDims(dims.filter((_, i) => i !== index));

  const isFormValid = name && rate && dims.every(d => d.label && d.max >= d.min);

  const handleAdd = () => {
    const sizeLabels: SizeLabel[] = ['S', 'M', 'L', 'XL', 'XXL'];
    const sizeChart: SizeChartEntry[] = dims[0]?.label ? sizeLabels.map((size, si) => ({
      size,
      measurements: Object.fromEntries(
        dims.map(d => [d.label, Math.round(d.min + (d.max - d.min) * (si / (sizeLabels.length - 1)))])
      ),
    })) : undefined as any;
    const newItem: UniformItem = {
      id: `I${String(items.length + 1).padStart(3, '0')}`,
      name,
      dimensions: dims,
      rate: Number(rate),
      sizeChart: sizeChart || undefined,
    };
    setItems([...items, newItem]);
    resetForm();
    setIsAddOpen(false);
    toast({ title: 'Item Added', description: `${newItem.name} has been added successfully.` });
  };

  const handleEdit = () => {
    if (!selectedItem) return;
    setItems(items.map(item =>
      item.id === selectedItem.id
        ? { ...item, name, dimensions: dims, rate: Number(rate) }
        : item
    ));
    setIsEditOpen(false);
    setSelectedItem(null);
    toast({ title: 'Item Updated', description: 'Item details have been updated successfully.' });
  };

  const handleDelete = () => {
    if (!selectedItem) return;
    setItems(items.filter(item => item.id !== selectedItem.id));
    setIsDeleteOpen(false);
    setSelectedItem(null);
    toast({ title: 'Item Deleted', description: 'Item has been removed successfully.' });
  };

  const openEdit = (item: UniformItem) => {
    setSelectedItem(item);
    setName(item.name);
    setRate(String(item.rate));
    setDims(item.dimensions.map(d => ({ ...d })));
    setIsEditOpen(true);
  };

  const openDelete = (item: UniformItem) => {
    setSelectedItem(item);
    setIsDeleteOpen(true);
  };

  const DimensionFields = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>Dimensions</Label>
        <Button type="button" variant="outline" size="sm" onClick={addDimRow}>
          <Plus className="h-3 w-3 mr-1" /> Add
        </Button>
      </div>
      {dims.map((dim, i) => (
        <div key={i} className="flex items-end gap-2 p-3 rounded-lg border bg-muted/30">
          <div className="flex-1 space-y-1">
            <Label className="text-xs text-muted-foreground">Label</Label>
            <Input
              value={dim.label}
              onChange={(e) => updateDim(i, 'label', e.target.value)}
              placeholder="e.g., Chest"
              className="h-8 text-sm"
            />
          </div>
          <div className="w-16 space-y-1">
            <Label className="text-xs text-muted-foreground">Min</Label>
            <Input
              type="number"
              value={dim.min || ''}
              onChange={(e) => updateDim(i, 'min', e.target.value)}
              className="h-8 text-sm"
            />
          </div>
          <div className="w-16 space-y-1">
            <Label className="text-xs text-muted-foreground">Max</Label>
            <Input
              type="number"
              value={dim.max || ''}
              onChange={(e) => updateDim(i, 'max', e.target.value)}
              className="h-8 text-sm"
            />
          </div>
          <div className="w-14 space-y-1">
            <Label className="text-xs text-muted-foreground">Unit</Label>
            <Input
              value={dim.unit}
              onChange={(e) => updateDim(i, 'unit', e.target.value)}
              className="h-8 text-sm"
            />
          </div>
          {dims.length > 1 && (
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => removeDimRow(i)}>
              <Trash2 className="h-3 w-3 text-destructive" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );

  const DimensionBadges = ({ dimensions }: { dimensions: DimensionRange[] }) => (
    <div className="flex flex-wrap gap-1.5">
      {dimensions.map((d, i) => (
        <span key={i} className="inline-flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-md">
          <span className="font-medium">{d.label}:</span>
          <span>{d.min}–{d.max} {d.unit}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle>Uniform Items Catalog</CardTitle>
          <Dialog open={isAddOpen} onOpenChange={(open) => { setIsAddOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Item</DialogTitle>
                <DialogDescription>Enter the item details below.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Item Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Shirt, Pant, Blazer" />
                </div>
                <DimensionFields />
                <div className="space-y-2">
                  <Label htmlFor="rate">Rate per Piece (₹)</Label>
                  <Input id="rate" type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g., 120" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                <Button onClick={handleAdd} disabled={!isFormValid}>Add Item</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table className="min-w-[400px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[80px]">Item</TableHead>
                  <TableHead className="hidden sm:table-cell">Dimensions</TableHead>
                  <TableHead className="text-right w-24">Rate</TableHead>
                  <TableHead className="text-right w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.name}
                      <div className="sm:hidden mt-1">
                        <DimensionBadges dimensions={item.dimensions} />
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <DimensionBadges dimensions={item.dimensions} />
                    </TableCell>
                    <TableCell className="text-right">{formatCurrency(item.rate)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(item)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openDelete(item)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {items.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                      No items found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Size Charts */}
      {items.filter(item => item.sizeChart && item.sizeChart.length > 0).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ruler className="h-5 w-5" />
              Size Charts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {items.filter(item => item.sizeChart && item.sizeChart.length > 0).map((item) => (
              <div key={item.id} className="space-y-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  {item.name}
                  <Badge variant="secondary" className="text-xs">{item.sizeChart!.length} sizes</Badge>
                </h3>
                <div className="rounded-md border overflow-x-auto">
                  <Table className="min-w-[300px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16">Size</TableHead>
                        {item.dimensions.map((d) => (
                          <TableHead key={d.label} className="text-center">{d.label} ({d.unit})</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {item.sizeChart!.map((sc) => (
                        <TableRow key={sc.size}>
                          <TableCell>
                            <Badge variant="outline" className="font-bold">{sc.size}</Badge>
                          </TableCell>
                          {item.dimensions.map((d) => (
                            <TableCell key={d.label} className="text-center">
                              {sc.measurements[d.label] ?? '—'}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}


      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogDescription>Update the item details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Item Name</Label>
              <Input id="edit-name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <DimensionFields />
            <div className="space-y-2">
              <Label htmlFor="edit-rate">Rate per Piece (₹)</Label>
              <Input id="edit-rate" type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Item</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedItem?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
