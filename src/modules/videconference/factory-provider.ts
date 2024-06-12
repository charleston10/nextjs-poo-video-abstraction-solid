import { Agora, Zoom, Alevideo } from "@/modules/videconference/providers";

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
