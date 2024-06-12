export abstract class VideoConferenceProvider {
  abstract name: string;

  abstract video(value: boolean): void;

  abstract sound(value: boolean): void;

  abstract call(value: boolean): void;

  abstract recordSound(value: boolean): void;

  abstract features(): string[];
}
