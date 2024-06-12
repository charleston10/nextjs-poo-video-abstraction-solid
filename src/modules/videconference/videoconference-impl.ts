import { VideoConferenceProvider } from "@/modules/videconference/videoconference.provider";
import { factoryProvider } from "@/modules/videconference/factory-provider";
import {
  FEATURE_CALL,
  FEATURE_RECORD_SOUND,
  FEATURE_SOUND,
  FEATURE_VIDEO,
} from "@/modules/videconference/features";
import { Videoconference } from "@/modules/videconference/videoconference";

export class VideoconferenceImpl implements Videoconference {
  private videoConferenceProvider: VideoConferenceProvider;

  constructor() {
    this.videoConferenceProvider = factoryProvider(
      process.env.NEXT_PUBLIC_VIDEO_PROVIDER || "agora",
    );
  }

  getName() {
    return this.videoConferenceProvider.name;
  }

  sound(value: boolean) {
    this.videoConferenceProvider.sound(value);
  }

  video(value: boolean) {
    this.videoConferenceProvider.video(value);
  }

  call(value: boolean) {
    this.videoConferenceProvider.call(value);
  }

  recordSound(value: boolean) {
    if (this.getFeatures().includes(FEATURE_RECORD_SOUND)) {
      this.videoConferenceProvider.recordSound(value);
    }
  }

  getFeatures(): string[] {
    return this.videoConferenceProvider.features();
  }

  hasFeature(name: string) {
    return this.getFeatures().includes(name);
  }

  hasFeatureVideo(): boolean {
    return this.hasFeature(FEATURE_VIDEO);
  }

  hasFeatureSound(): boolean {
    return this.hasFeature(FEATURE_SOUND);
  }

  hasFeatureRecordSound(): boolean {
    return this.hasFeature(FEATURE_RECORD_SOUND);
  }

  hasFeatureCall(): boolean {
    return this.hasFeature(FEATURE_CALL);
  }
}
