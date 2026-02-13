import z from "zod";
import { slugify } from "./util.slug.js";

export const ProfileId = z.string().regex(/^[a-z_]+$/);
export type ProfileId = z.infer<typeof ProfileId>;

export const ProfileColor = z.string().regex(/^#[0-9a-f]{6}$/);
export type ProfileColor = z.infer<typeof ProfileColor>;

export const Profile = z.object({
  id: ProfileId,
  name: z.string().min(1).max(50),
  primaryColor: ProfileColor,
  secondaryColor: ProfileColor,
  createdAt: z.date(),
});
export type Profile = z.infer<typeof Profile>;

export function createProfileId(name: string): ProfileId {
  return slugify(name) as ProfileId;
}

export function generateRandomProfileColor(): ProfileColor {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 70 + Math.floor(Math.random() * 30); // 70-100%
  const lightness = 40 + Math.floor(Math.random() * 20); // 40-60%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)` as ProfileColor;
}

export function createProfile(name: string): Profile {
  return {
    id: createProfileId(name),
    name,
    primaryColor: generateRandomProfileColor(),
    secondaryColor: generateRandomProfileColor(),
    createdAt: new Date(),
  };
}
