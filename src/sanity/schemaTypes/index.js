import { projectType } from "./project";
import { brandType } from "./brand";
import { toolType } from "./tools";
import { serviceType } from "./service";
import { siteSettingsType } from "./siteSettings";

export const schema = {
  types: [projectType, brandType, toolType, serviceType, siteSettingsType],
};
