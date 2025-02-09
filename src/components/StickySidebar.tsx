import { Card, type CardProps } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

type StickySidebar = Omit<CardProps, 'hoverEffect'>;
export function StickySidebar({ className, children }: StickySidebar) {
  return (
    <Card
      className={cn(
        'z-10 flex h-fit max-h-[50vh] flex-col p-0 md:sticky md:top-[81px] md:max-h-[calc(100vh-65px-32px)] md:w-[294px]',
        className,
      )}
    >
      <ScrollArea className="flex h-full flex-col px-4" type="auto">
        <div className="py-4">{children}</div>
      </ScrollArea>
    </Card>
  );
}
