import { Card, CardContent } from "~/components/ui/card";

interface ErrorDisplayProps {
  error: string;
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  return (
    <Card className="mb-8 border-red-300 bg-red-50">
      <CardContent>
        <p className="text-red-500">Error: {error}</p>
      </CardContent>
    </Card>
  );
}
