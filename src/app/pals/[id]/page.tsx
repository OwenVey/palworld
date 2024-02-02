import { ItemDropsCard } from '@/app/pals/[id]/PalDropsCard';
import { PalStatsSidebar } from '@/app/pals/[id]/PalStatsSidebar';
import { ElementImage } from '@/components/ElementImage';
import { PartnerSkillImage } from '@/components/PartnerSkillImage';
import { WorkTypeImage } from '@/components/WorkTypeImage';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import pals from '@/data/pals.json';
import { getEntityFromListById, getWorkLabel } from '@/lib/utils';
import { PalSchema } from '@/schemas/pal';
import Link from 'next/link';

export function generateMetadata({ params }: { params: { id: string } }) {
  const pal = pals.find((pal) => pal.id === params.id);
  return {
    title: pal ? pal.name : 'Not Found',
  };
}
export function generateStaticParams() {
  return pals
    .filter((pal) => pal.zukanIndex > 0)
    .map(({ id }) => ({
      id,
    }));
}

export default function PalPage({ params }: { params: { id: string } }) {
  const { data: pal, error } = getEntityFromListById(pals, params.id, PalSchema);

  if (error !== null) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <PalStatsSidebar className="h-fit lg:sticky lg:top-[81px] lg:w-80" pal={pal} />

      <div className="flex flex-1 grid-cols-1 flex-col gap-4 lg:grid lg:grid-cols-2">
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <p className="text-gray-11">{pal.description}</p>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Partner Skill</CardTitle>
            </CardHeader>
            {pal.partnerSkill.name !== null ? (
              <div>
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <PartnerSkillImage id={pal.partnerSkillIcon.toString()} className="size-8 scale-[2]" />
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
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Work Suitability</CardTitle>
          </CardHeader>
          <div className="flex flex-col gap-2">
            {Object.entries(pal.workSuitabilities)
              .filter(([, value]) => value > 0)
              .sort(([, value1], [, value2]) => value2 - value1)
              .map(([workId, value]) => (
                <div
                  key={workId}
                  className="flex items-center rounded border border-gray-4 bg-gray-3 px-3 py-2 text-gray-12"
                >
                  <WorkTypeImage id={workId} className="size-8" />
                  <span className="ml-3 font-medium capitalize">{getWorkLabel(workId)}</span>
                  <div className="ml-auto font-mono text-sm font-medium">
                    Lv <span className="text-base">{value}</span>
                  </div>
                </div>
              ))}
          </div>
        </Card>

        <ItemDropsCard className="col-span-2" drops={pal.drops} alphaDrops={pal.bossDrops} />

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Active Skills</CardTitle>
          </CardHeader>
          <div className="flex flex-col gap-2">
            {pal.activeSkills.map((skill) => (
              <Link key={skill.id} href={`/skills/${skill.id}`}>
                <Card className="relative border-gray-5 bg-gray-3" hoverEffect>
                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      <ElementImage className="size-8" element={skill.element} tooltipSide="left" />
                      <div className="font-medium text-gray-12">{skill.name}</div>
                    </div>

                    <Badge className="absolute right-2 top-2 bg-gray-5 font-mono text-sm">Lv {skill.level}</Badge>
                  </div>
                  <div className="-mt-1 space-y-2 pl-12">
                    {/* <p className="text-sm text-gray-11">{skill.description}</p> */}
                    <div className="flex gap-2">
                      <Badge className="font-mono" variant="red">
                        Power: {skill.power}
                      </Badge>
                      <Badge className="font-mono" variant="yellow">
                        CT: {skill.cooldownTime}
                      </Badge>
                      <Badge className="font-mono" variant="gray">
                        Range:{' '}
                        {skill.minRange === skill.maxRange ? skill.minRange : `${skill.minRange}-${skill.maxRange}`}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-11">{skill.description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
