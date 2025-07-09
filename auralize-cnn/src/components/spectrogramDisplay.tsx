import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import ColorScale from "~/components/colorScale";
import FeatureMap from "~/components/featureMap";
import type { LayerData } from "../types/audio";

interface SpectrogramDisplayProps {
  data: LayerData;
}

export function SpectrogramDisplay({ data }: SpectrogramDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-stone-800">Input Spectrogram</CardTitle>
      </CardHeader>
      <CardContent>
        <FeatureMap
          data={data.values}
          title={`${data.shape.join(" x ")}`}
          spectrogram={true}
        />
        <div className="mt-5 flex justify-end">
          <ColorScale width={200} height={16} min={-1} mx={1} />
        </div>
      </CardContent>
    </Card>
  );
}