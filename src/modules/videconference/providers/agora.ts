import { VideoConferenceProvider } from "@/modules/videconference/videoconference.provider";
import {
  FEATURE_CALL,
  FEATURE_RECORD_SOUND,
  FEATURE_SOUND,
  FEATURE_VIDEO,
} from "@/modules/videconference/features";

export class Agora extends VideoConferenceProvider {
  name: string = "Agora Provider";

  private _isSound: boolean = false;
  private _isVideo: boolean = false;
  private _isCall: boolean = false;
  private _isRecordSound: boolean = false;

  video(value: boolean): void {
    this._isVideo = value;
  }

  sound(value: boolean): void {
    this._isSound = value;
  }

  call(value: boolean): void {
    this._isCall = value;
  }

  recordSound(value: boolean): void {
    this._isRecordSound = value;
  }

  features(): string[] {
    return [FEATURE_VIDEO, FEATURE_SOUND, FEATURE_RECORD_SOUND, FEATURE_CALL];
  }
}
