import { LoadingPageSkeleton } from '@/components/LoadingPageSkeleton';

export default function Loading() {
  return (
    <LoadingPageSkeleton
      sidebarHeight={752}
      numItems={137}
      itemHeight={132}
      gridClasses="grid grid-cols-2 gap-4 @2xl:grid-cols-3 @5xl:grid-cols-4"
    />
  );
}
