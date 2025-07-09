import { useState } from "react";
import type { ApiResponse } from "../types/audio";
import { convertFileToBase64 } from "../utils/audioUtils";

function isApiResponse(data: unknown): data is ApiResponse {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const obj = data as Record<string, unknown>;
  return (
    Array.isArray(obj.predictions) &&
    typeof obj.visualization === "object" &&
    typeof obj.input_spectrogram === "object" &&
    typeof obj.waveform === "object"
  );
}

export function useAudioAnalysis() {
  const [vizData, setVizData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const analyzeAudio = async (file: File): Promise<void> => {
    setFileName(file.name);
    setIsLoading(true);
    setError(null);
    setVizData(null);

    try {
      const base64String = await convertFileToBase64(file);

      const apiUrl = process.env.NEXT_PUBLIC_MODAL_API;
      if (!apiUrl) {
        throw new Error(
          "NEXT_PUBLIC_MODAL_API environment variable is not set",
        );
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audio_data: base64String }),
      });

      if (!response.ok) {
        throw new Error(`API error ${response.statusText}`);
      }

      const data: unknown = await response.json();

      if (!isApiResponse(data)) {
        throw new Error("Invalid API response format");
      }

      setVizData(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetAnalysis = () => {
    setVizData(null);
    setError(null);
    setFileName("");
  };

  return {
    vizData,
    isLoading,
    fileName,
    error,
    analyzeAudio,
    resetAnalysis,
  };
}
