'use client';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import pals from '@/data/pals.json';
import { type Pal } from '@/types';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function PalsPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const router = useRouter();
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
  const [isPending, startTransition] = useTransition();

  const sortedPals = pals.sort((a, b) => a.zukanIndex - b.zukanIndex);
  const filteredPals = search
    ? sortedPals.filter((pal) => pal.name.toLowerCase().includes(search?.toLowerCase()))
    : (sortedPals satisfies Pal[]);
  return (
    <div className="mt-10">
      <Input
        label="Search"
        placeholder="Search pal name"
        icon={SearchIcon}
        defaultValue={search}
        onChange={(event) => {
          startTransition(() => {
            if (event.target.value) {
              router.push(`/pals?search=${event.target.value}`);
            } else {
              router.push('/pals');
            }
          });
        }}
      />

      <div className="grid grid-cols-5 gap-4 py-4">
        {filteredPals.map((pal) => (
          <Link
            href={`/pals/${pal.id}`}
            key={pal.id}
            className="flex flex-col items-center rounded-lg border border-gray-6 bg-gray-2 p-2 shadow-sm transition-colors hover:border-primary-9 hover:shadow-md hover:shadow-primary-5"
          >
            <div className="relative flex w-full justify-between">
              <div className="absolute left-0 flex flex-col">
                <Badge className="h-fit items-baseline font-mono font-bold tracking-wide" variant="outline">
                  <span className="text-gray-8">#{'000'.slice(pal.zukanIndex.toString().length)}</span>
                  <span>{pal.zukanIndex}</span>
                  <span className="text-[10px]">{pal.zukanIndexSuffix}</span>
                </Badge>

                <div className="mt-2 flex flex-col gap-1">
                  {[pal.elementType1, pal.elementType2].filter(Boolean).map((element) => (
                    <Tooltip key={element}>
                      <TooltipTrigger>
                        <Image
                          className="size-6"
                          src={`/images/elements/${element}.png`}
                          alt={`${element} element`}
                          height={24}
                          width={24}
                          quality={100}
                          unoptimized
                        />
                      </TooltipTrigger>
                      <TooltipContent side="left" className="capitalize">
                        {element}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>

              <div className="absolute right-0 flex flex-col flex-wrap gap-0">
                {Object.entries(pal.work)
                  .filter(([_, value]) => value > 0)
                  .map(([work, value]) => (
                    <Tooltip key={work}>
                      <TooltipTrigger className="flex items-center">
                        <Image
                          src={`/images/work/${work}.png`}
                          alt={`${work}`}
                          height={24}
                          width={24}
                          quality={100}
                          unoptimized
                        />
                        <span className="text-xs font-semibold text-gray-11">{value}</span>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="fcapitalize">
                        {work.replace('-', ' ')}
                      </TooltipContent>
                    </Tooltip>
                  ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 py-2">
              <Image
                className="size-28 rounded-full border border-gray-6 bg-gray-1"
                src={`/images/pals/${pal.name.toLowerCase()}.png`}
                alt={`image of ${pal.name}`}
                height={112}
                width={112}
                quality={100}
                unoptimized
              />

              <div className="font-medium">{pal.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
