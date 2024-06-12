import { VideoConferenceProvider } from "@/modules/videconference/videoconference.provider";
import {
  FEATURE_CALL,
  FEATURE_RECORD_SOUND,
  FEATURE_SOUND,
  FEATURE_VIDEO,
} from "@/modules/videconference/features";

export class Zoom extends VideoConferenceProvider {
  name: string = "Zoom Provider";

  private _isSound: boolean = false;
  private _isVideo: boolean = false;
  private _isCall: boolean = false;

  video(value: boolean): void {
    this._isVideo = value;
  }

  sound(value: boolean): void {
    if (value) {
      this.soundOn();
    } else {
      this.soundOff();
    }
  }

  call(value: boolean): void {
    this._isCall = value;
  }

  recordSound(value: boolean): void {
    throw new Error("Not supported record sound");
  }

  features(): string[] {
    return [FEATURE_VIDEO, FEATURE_SOUND, FEATURE_CALL];
  }

  private soundOn() {
    this._isSound = true;
  }

  private soundOff() {
    this._isSound = false;
  }
}
