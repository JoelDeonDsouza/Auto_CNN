import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import WaveForm from "~/components/waveForm";
import type { WaveformData } from "../types/audio";

interface WaveformDisplayProps {
  data: WaveformData;
}

export function WaveformDisplay({ data }: WaveformDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-stone-800">Audio Waveform</CardTitle>
      </CardHeader>
      <CardContent>
        <WaveForm
          data={data.values}
          title={`${data.duration.toFixed(2)}s * ${data.sample_rate}Hz`}
        />
      </CardContent>
    </Card>
  );
}