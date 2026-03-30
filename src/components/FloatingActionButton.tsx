import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ClipboardPlus, Shirt, Users, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const actions = [
  { icon: ClipboardPlus, label: 'New Order', path: '/new-order' },
  { icon: Shirt, label: 'Uniform Items', path: '/uniform-items' },
  { icon: Users, label: 'Workers', path: '/workers' },
];

export default function FloatingActionButton() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-center gap-3">
      {/* Action items */}
      {open && actions.map((action, i) => (
        <button
          key={action.path}
          onClick={() => { navigate(action.path); setOpen(false); }}
          className={cn(
            "flex items-center gap-2 bg-primary text-primary-foreground rounded-full pl-3 pr-4 py-2.5 shadow-lg",
            "animate-in fade-in slide-in-from-bottom-2 duration-200"
          )}
          style={{ animationDelay: `${i * 50}ms` }}
        >
          <action.icon className="h-4 w-4" />
          <span className="text-sm font-medium whitespace-nowrap">{action.label}</span>
        </button>
      ))}

      {/* FAB trigger */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center transition-transform duration-200",
          open && "rotate-45"
        )}
      >
        {open ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </button>
    </div>
  );
}
