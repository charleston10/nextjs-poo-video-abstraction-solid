import { Agora, Zoom } from "@/modules/videconference/providers";
import { Alevideo } from "@/modules/videconference/providers/alevideo";

export function factoryProvider(providerName: string) {
  switch (providerName) {
    case "agora":
      return new Agora();
    case "zoom":
      return new Zoom();
    case "alevideo":
      return new Alevideo();
    default:
      return new Agora();
  }
}
