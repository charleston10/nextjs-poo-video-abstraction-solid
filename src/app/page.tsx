"use client";

import React, { useEffect, useState } from "react";
import { VideoconferenceImpl } from "@/modules/videconference/videoconference-impl";
import { Videoconference } from "@/modules/videconference/videoconference";

const videoconference: Videoconference = new VideoconferenceImpl();

export default function Home() {
  const [microphoneState, setMicrophoneState] = useState(false);
  const [videoState, setVideoState] = useState(false);
  const [callState, setCallState] = useState(false);
  const [recordSoundState, setRecordSoundState] = useState(false);

  useEffect(() => {
    console.log(`microphoneState ${microphoneState}`);
    videoconference.sound(microphoneState);
  }, [microphoneState]);

  useEffect(() => {
    console.log(`videoState ${videoState}`);
    videoconference.video(videoState);
  }, [videoState]);

  useEffect(() => {
    console.log(`callState ${callState}`);
    videoconference.call(callState);
  }, [callState]);

  useEffect(() => {
    console.log(`recordSoundState ${recordSoundState}`);
    videoconference.recordSound(recordSoundState);
  }, [recordSoundState]);

  useEffect(() => {
    console.log(`videoconference`, videoconference);
  }, [microphoneState, videoState, callState, recordSoundState]);

  return (
    <main>
      <div className={"window"}>
        <span>{videoconference.getName()}</span>
      </div>

      <div className={"actions"}>
        {videoconference.hasFeatureSound() && (
          <button
            className={microphoneState ? "action-state-on" : "action-state-off"}
            onClick={() => setMicrophoneState(!microphoneState)}
          >
            {microphoneState ? "Off sound" : "On sound"}
          </button>
        )}

        {videoconference.hasFeatureVideo() && (
          <button
            className={videoState ? "action-state-on" : "action-state-off"}
            onClick={() => setVideoState(!videoState)}
          >
            {videoState ? "Off Video" : "On Video"}
          </button>
        )}

        {videoconference.hasFeatureRecordSound() && (
          <button
            className={
              recordSoundState ? "action-state-on" : "action-state-off"
            }
            onClick={() => setRecordSoundState(!recordSoundState)}
          >
            {recordSoundState ? "Off Record Sound" : "On Record Sound"}
          </button>
        )}

        {videoconference.hasFeatureCall() && (
          <button
            className={callState ? "action-state-on" : "action-state-off"}
            onClick={() => setCallState(!callState)}
          >
            {callState ? "End Call" : "Start Call"}
          </button>
        )}
      </div>
    </main>
  );
}
