import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
  fileName: string;
}

export function FileUpload({ onFileSelect, isLoading, fileName }: FileUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative inline-block">
        <input
          type="file"
          accept=".wav"
          id="file-upload"
          onChange={handleFileChange}
          disabled={isLoading}
          className="absolute inset-0 w-full cursor-pointer opacity-0"
        />
        <Button
          disabled={isLoading}
          className="border-stone-300"
          variant="outline"
          size="lg"
        >
          {isLoading ? "Uploading..." : "Upload file"}
        </Button>
      </div>
      {fileName && (
        <Badge variant="outline" className="mt-4 bg-stone-200 text-stone-700">
          {fileName}
        </Badge>
      )}
    </div>
  );
}