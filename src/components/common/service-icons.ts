import {
  Briefcase,
  FileCheck2,
  HeartPulse,
  Landmark,
  PiggyBank,
  SearchCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

import type { IconKey } from "@/config/site";

export const SERVICE_ICONS: Record<IconKey, LucideIcon> = {
  search: SearchCheck,
  heart: HeartPulse,
  family: Users,
  file: FileCheck2,
  piggy: PiggyBank,
  landmark: Landmark,
  briefcase: Briefcase,
};
