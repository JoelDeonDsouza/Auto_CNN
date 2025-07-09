"use client";
import { useAudioAnalysis } from "~/hooks/useAudioAnalysis";
import { splitLayers } from "~/utils/audioUtils";
import { FileUpload } from "~/components/fileUpload";
import { ErrorDisplay } from "~/components/errorDisplay";
import { PredictionResults } from "~/components/predictionResults";
import { SpectrogramDisplay } from "~/components/spectrogramDisplay";
import { WaveformDisplay } from "~/components/waveformDisplay";
import { FeatureMapsDisplay } from "~/components/featureMapsDisplay";

export default function HomePage() {
  const { vizData, isLoading, fileName, error, analyzeAudio } =
    useAudioAnalysis();

  const handleFileSelect = (file: File) => {
    void analyzeAudio(file);
  };

  const layers = vizData
    ? splitLayers(vizData.visualization)
    : { main: [], internals: {} };

  return (
    <main className="min-h-screen bg-sky-50 p-8">
      <div className="mx-auto max-w-[100%]">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl tracking-tight">Auralize CNN</h1>
          <p className="text-md mb-8 text-stone-500">
            Upload a WAV file to run predictions and visualize feature maps
          </p>
          <FileUpload
            onFileSelect={handleFileSelect}
            isLoading={isLoading}
            fileName={fileName}
          />
        </div>

        {error && <ErrorDisplay error={error} />}

        {vizData && (
          <div className="space-y-8">
            <PredictionResults predictions={vizData.predictions} />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <SpectrogramDisplay data={vizData.input_spectrogram} />
              <WaveformDisplay data={vizData.waveform} />
            </div>

            <FeatureMapsDisplay layers={layers} />
          </div>
        )}
      </div>
    </main>
  );
}
