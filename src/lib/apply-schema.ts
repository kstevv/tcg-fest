import { z } from "zod";

export const Base = z.object({
  type: z.enum(["sponsor", "vendor", "press"]),
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  city: z.string().optional(),
  notes: z.string().optional(),
});

const Sponsor = Base.extend({
  type: z.literal("sponsor"),
  brand: z.string().min(2, "Brand required"),
  website: z.string().url().optional(),
  goals: z.string().optional(),
  budgetRange: z.enum(["<$2k", "$2k–$5k", "$5k–$10k", "$10k+"]).optional(),
});

const Vendor = Base.extend({
  type: z.literal("vendor"),
  brand: z.string().min(2, "Brand required"),
  numberOfBooths: z.coerce.number().int().min(1, "At least 1 booth"),
  whatTheySell: z.string().optional(),
});

const Press = Base.extend({
  type: z.literal("press"),
  mediaType: z.string().min(2, "Media type required"),
  primaryPlatform: z.string().optional(),
  approxFollowers: z.string().optional(),
});

export const ApplicationSchema = z.discriminatedUnion("type", [Sponsor, Vendor, Press]);
export type Application = z.infer<typeof ApplicationSchema>;
