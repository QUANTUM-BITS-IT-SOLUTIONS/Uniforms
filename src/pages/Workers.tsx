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
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';
import { workers as initialWorkers, Worker } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export default function Workers() {
  const [workers, setWorkers] = useLocalStorage<Worker[]>('app_workers', initialWorkers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', bankUpi: '' });
  const { toast } = useToast();

  const filteredWorkers = workers.filter(worker =>
    worker.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    const newWorker: Worker = {
      id: `W${String(workers.length + 1).padStart(3, '0')}`,
      name: formData.name,
      phone: formData.phone,
      bankUpi: formData.bankUpi,
    };
    setWorkers([...workers, newWorker]);
    setFormData({ name: '', phone: '', bankUpi: '' });
    setIsAddOpen(false);
    toast({ title: 'Worker Added', description: `${newWorker.name} has been added successfully.` });
  };

  const handleEdit = () => {
    if (!selectedWorker) return;
    setWorkers(workers.map(w => 
      w.id === selectedWorker.id 
        ? { ...w, name: formData.name, phone: formData.phone, bankUpi: formData.bankUpi }
        : w
    ));
    setIsEditOpen(false);
    setSelectedWorker(null);
    toast({ title: 'Worker Updated', description: 'Worker details have been updated successfully.' });
  };

  const handleDelete = () => {
    if (!selectedWorker) return;
    setWorkers(workers.filter(w => w.id !== selectedWorker.id));
    setIsDeleteOpen(false);
    setSelectedWorker(null);
    toast({ title: 'Worker Deleted', description: 'Worker has been removed successfully.' });
  };

  const openEdit = (worker: Worker) => {
    setSelectedWorker(worker);
    setFormData({ name: worker.name, phone: worker.phone, bankUpi: worker.bankUpi });
    setIsEditOpen(true);
  };

  const openDelete = (worker: Worker) => {
    setSelectedWorker(worker);
    setIsDeleteOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle>Workers Management</CardTitle>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Worker
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Worker</DialogTitle>
                <DialogDescription>Enter the worker details below.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter worker name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bankUpi">Bank/UPI</Label>
                  <Input
                    id="bankUpi"
                    value={formData.bankUpi}
                    onChange={(e) => setFormData({ ...formData, bankUpi: e.target.value })}
                    placeholder="GPay, PhonePe, Paytm, etc."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                <Button onClick={handleAdd} disabled={!formData.name || !formData.phone}>
                  Add Worker
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search workers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Table */}
          <div className="rounded-md border overflow-x-auto">
            <Table className="min-w-[500px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">ID</TableHead>
                  <TableHead className="min-w-[120px]">Name</TableHead>
                  <TableHead className="min-w-[100px]">Phone</TableHead>
                  <TableHead className="hidden sm:table-cell">Bank/UPI</TableHead>
                  <TableHead className="text-right w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkers.map((worker) => (
                  <TableRow key={worker.id}>
                    <TableCell className="font-mono text-xs">{worker.id}</TableCell>
                    <TableCell className="font-medium whitespace-nowrap">{worker.name}</TableCell>
                    <TableCell className="text-sm">{worker.phone}</TableCell>
                    <TableCell className="hidden sm:table-cell">{worker.bankUpi || '—'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(worker)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openDelete(worker)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredWorkers.length === 0 && (
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

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Worker</DialogTitle>
            <DialogDescription>Update the worker details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-bankUpi">Bank/UPI</Label>
              <Input
                id="edit-bankUpi"
                value={formData.bankUpi}
                onChange={(e) => setFormData({ ...formData, bankUpi: e.target.value })}
              />
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
            <DialogTitle>Delete Worker</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedWorker?.name}? This action cannot be undone.
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
