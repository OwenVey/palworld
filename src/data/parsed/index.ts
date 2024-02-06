import itemRecipesJson from '@/data/item-recipes.json';
import itemsJson from '@/data/items.json';
import palsJson from '@/data/pals.json';
import skillsJson from '@/data/skills.json';
import { ItemSchema } from '@/schemas/item';
import { ItemRecipeSchema } from '@/schemas/item-recipe';
import { PalSchema } from '@/schemas/pal';
import { SkillSchema } from '@/schemas/skill';
import { z } from 'zod';

export const pals = z.array(PalSchema).parse(palsJson);
export const items = z.array(ItemSchema).parse(itemsJson);
export const skills = z.array(SkillSchema).parse(skillsJson);
export const itemRecipes = z.array(ItemRecipeSchema).parse(itemRecipesJson);
