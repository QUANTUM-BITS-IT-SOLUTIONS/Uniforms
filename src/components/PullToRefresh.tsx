import { ReactNode } from 'react';
import { RefreshCw } from 'lucide-react';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';
import { cn } from '@/lib/utils';

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<void> | void;
  className?: string;
}

export function PullToRefresh({ children, onRefresh, className }: PullToRefreshProps) {
  const { containerRef, pullDistance, isRefreshing, threshold } = usePullToRefresh({
    onRefresh,
    threshold: 80,
  });

  const progress = Math.min(pullDistance / threshold, 1);
  const showIndicator = pullDistance > 10 || isRefreshing;

  return (
    <div 
      ref={containerRef} 
      className={cn("relative h-full overflow-auto", className)}
    >
      {/* Pull indicator */}
      <div 
        className={cn(
          "absolute left-1/2 -translate-x-1/2 z-50 flex items-center justify-center transition-opacity duration-200",
          showIndicator ? "opacity-100" : "opacity-0"
        )}
        style={{ 
          top: Math.max(8, pullDistance - 40),
          transform: `translateX(-50%) scale(${0.5 + progress * 0.5})`,
        }}
      >
        <div className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full bg-background border shadow-md",
          isRefreshing && "animate-pulse"
        )}>
          <RefreshCw 
            className={cn(
              "h-5 w-5 text-primary transition-transform duration-200",
              isRefreshing && "animate-spin"
            )}
            style={{ 
              transform: isRefreshing ? undefined : `rotate(${progress * 360}deg)`,
            }}
          />
        </div>
      </div>

      {/* Content with pull offset */}
      <div 
        className="transition-transform duration-200 ease-out"
        style={{ 
          transform: pullDistance > 0 ? `translateY(${pullDistance}px)` : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
}
