import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Progress } from "~/components/ui/progress";
import { GetEomji } from "~/lib/getEomji";
import type { Prediction } from "../types/audio";

interface PredictionResultsProps {
  predictions: Prediction[];
}

export function PredictionResults({ predictions }: PredictionResultsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-stone-800">Top Predictions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {predictions.slice(0, 3).map((pred, i) => (
            <div key={pred.class} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-md font-medium text-stone-600">
                  {GetEomji(pred.class)}{" "}
                  <span>{pred.class.replaceAll("_", " ")}</span>
                </div>
                <Badge variant={i === 0 ? "destructive" : "secondary"}>
                  {(pred.confidence * 100).toFixed(1)}%
                </Badge>
              </div>
              <Progress value={pred.confidence * 100} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
