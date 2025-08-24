"use client";

import { useState, useEffect, useCallback } from "react";
import { vapi } from "@/lib/vapi";

export interface VapiCallDetails {
  assistantIsSpeaking: boolean;
  volumeLevel: number;
  isCallActive: boolean;
}

export const useVapi = () => {
  const [callDetails, setCallDetails] = useState<VapiCallDetails>({
    assistantIsSpeaking: false,
    volumeLevel: 0,
    isCallActive: false,
  });

  useEffect(() => {
    const handleCallStart = () => {
      setCallDetails(prev => ({ ...prev, isCallActive: true }));
    };

    const handleCallEnd = () => {
      setCallDetails({
        assistantIsSpeaking: false,
        volumeLevel: 0,
        isCallActive: false,
      });
    };

    const handleSpeechStart = () => {
      setCallDetails(prev => ({ ...prev, assistantIsSpeaking: true }));
    };

    const handleSpeechEnd = () => {
      setCallDetails(prev => ({ ...prev, assistantIsSpeaking: false }));
    };

    const handleVolumeLevel = (volume: number) => {
      setCallDetails(prev => ({ ...prev, volumeLevel: volume }));
    };

    vapi.on("call-start", handleCallStart);
    vapi.on("call-end", handleCallEnd);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("volume-level", handleVolumeLevel);

    return () => {
      vapi.off("call-start", handleCallStart);
      vapi.off("call-end", handleCallEnd);
      vapi.off("speech-start", handleSpeechStart);
      vapi.off("speech-end", handleSpeechEnd);
      vapi.off("volume-level", handleVolumeLevel);
    };
  }, []);

  const endCall = useCallback(() => {
    vapi.stop();
  }, []);

  return { callDetails, endCall };
};