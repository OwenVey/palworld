import { ElementImage } from '@/components/ElementImage';
import { PalImage } from '@/components/PalImage';
import { WorkTypeImage } from '@/components/WorkTypeImage';
import { Badge } from '@/components/ui/badge';
import pals from '@/data/pals.json';

export function generateMetadata({ params }: { params: { id: string } }) {
  const pal = pals.find((pal) => pal.id === params.id);
  return {
    title: pal ? pal.name : 'Not Found',
  };
}
export function generateStaticParams() {
  return pals.map(({ id }) => ({
    id,
  }));
}

export default function PalPage({ params }: { params: { id: string } }) {
  const pal = pals.find((pal) => pal.id === params.id);

  if (!pal) return <div>No pal found with the id {params.id}</div>;

  return (
    <div className="flex gap-8 py-4">
      <Card className="relative flex w-80 flex-col">
        <Badge className="absolute items-baseline font-mono text-sm font-bold tracking-wider" variant="outline">
          <span className="text-gray-8">#{'000'.slice(pal.zukanIndex.toString().length)}</span>
          <span>{pal.zukanIndex}</span>
          <span className="text-xs">{pal.zukanIndexSuffix}</span>
        </Badge>

        <div className="absolute right-0 flex flex-col gap-2 pr-[inherit]">
          {[pal.elementType1, pal.elementType2].filter(Boolean).map((element) => (
            <ElementImage key={element} element={element} className="size-8" tooltipSide="left" />
          ))}
        </div>

        <PalImage pal={pal.id} className="mx-auto mt-2 size-36 rounded-full border border-gray-6 bg-gray-1" />

        <div className="mt-2 text-center">
          <h1 className="text-2xl font-semibold text-gray-12">{pal.name}</h1>
          <p className="text-gray-11">{pal.title}</p>
        </div>

        <div>Stats</div>
      </Card>

      <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-8">
        <Card heading="Description">
          <p className="text-gray-11">{pal.description}</p>
        </Card>

        <Card heading="Work Suitability">
          <div className="flex flex-col gap-2">
            {Object.entries(pal.workSuitabilities)
              .filter(([, value]) => value > 0)
              .sort(([, value1], [, value2]) => value2 - value1)
              .map(([work, value]) => (
                <div
                  key={work}
                  className="flex items-center rounded border border-gray-5 bg-gray-3 px-3 py-2 text-gray-12"
                >
                  <WorkTypeImage workType={work} className="size-8" />
                  <span className="ml-3 font-medium capitalize">{work.replace('-', ' ')}</span>
                  <div className="ml-auto font-mono text-sm font-medium">
                    Lv <span className="text-base">{value}</span>
                  </div>
                </div>
              ))}
          </div>
        </Card>

        <Card heading="Partner Skill">
          {pal.partnerSkill.name !== null ? (
            <div>
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <ElementImage className="size-8" element="fire" tooltipSide="left" />
                  <div className="font-medium text-gray-12">{pal.partnerSkill.name}</div>
                </div>
              </div>
              <div className="pl-12">
                <p className="text-sm text-gray-11">{pal.partnerSkill.description}</p>
              </div>
            </div>
          ) : (
            <div>None</div>
          )}
        </Card>

        <Card heading="Active Skills" className="col-span-2">
          <div className="flex flex-col gap-2">
            {pal.activeSkills.map((skill) => (
              <div key={skill.id} className="rounded-lg border border-gray-5 bg-gray-3 p-4">
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <ElementImage className="size-8" element={skill.element} tooltipSide="left" />
                    <div className="font-medium text-gray-12">{skill.name}</div>
                  </div>

                  <div className="font-mono text-sm font-medium">
                    Lv <span className="text-base">{skill.level}</span>
                  </div>
                </div>
                <div className="-mt-1 pl-12">
                  <p className="text-sm text-gray-11">{skill.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: string;
}
function Card({ heading, className, children, ...rest }: CardProps) {
  return (
    <div className={className}>
      {heading && <h4 className="mb-1 text-xl font-semibold">{heading}</h4>}
      <div className="rounded-lg border border-gray-4 bg-gray-2 p-4" {...rest}>
        {children}
      </div>
    </div>
  );
}
