export interface Videoconference {
  sound(value: boolean): void;

  video(value: boolean): void;

  call(value: boolean): void;

  recordSound(value: boolean): void;

  getFeatures(): string[];

  getName(): string;

  hasFeature(name: string): boolean;

  hasFeatureVideo(): boolean;

  hasFeatureSound(): boolean;

  hasFeatureRecordSound(): boolean;

  hasFeatureCall(): boolean;
}
