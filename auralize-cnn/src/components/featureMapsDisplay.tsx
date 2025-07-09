import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import ColorScale from "~/components/colorScale";
import FeatureMap from "~/components/featureMap";
import type { SplitLayersResult } from "../types/audio";

interface FeatureMapsDisplayProps {
  layers: SplitLayersResult;
}

export function FeatureMapsDisplay({ layers }: FeatureMapsDisplayProps) {
  const { main, internals } = layers;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Convolutional Layer Outputs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-6">
          {main.map(([mainName, mainData]) => (
            <div key={mainName} className="space-y-4">
              <div>
                <h4 className="mb-2 font-medium text-stone-700">{mainName}</h4>
                <FeatureMap
                  data={mainData.values}
                  title={`${mainData.shape.join(" x ")}`}
                />
              </div>
              {internals[mainName] && (
                <div className="h-80 overflow-y-auto rounded border border-stone-200 bg-stone-50 p-2">
                  <div className="space-y-2">
                    {internals[mainName]
                      .sort(([a], [b]) => a.localeCompare(b))
                      .map(([layerName, layerData]) => (
                        <FeatureMap
                          key={layerName}
                          data={layerData.values}
                          title={layerName.replace(`${mainName}.`, "")}
                          internal={true}
                        />
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-end">
          <ColorScale width={200} height={16} min={-1} mx={1} />
        </div>
      </CardContent>
    </Card>
  );
}