import type {
  VisualizeData,
  LayerData,
  SplitLayersResult,
} from "../types/audio";

export function splitLayers(visualization: VisualizeData): SplitLayersResult {
  const main: [string, LayerData][] = [];
  const internals: Record<string, [string, LayerData][]> = {};

  for (const [name, data] of Object.entries(visualization)) {
    if (!name.includes(".")) {
      main.push([name, data]);
    } else {
      const [parent] = name.split(".");
      if (parent === undefined) continue;
      internals[parent] ??= [];
      internals[parent].push([name, data]);
    }
  }

  return { main, internals };
}

export function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const arrayBuffer = reader.result as ArrayBuffer;
        const base64String = btoa(
          new Uint8Array(arrayBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            "",
          ),
        );
        resolve(base64String);
      } catch (error) {
        reject(
          error instanceof Error ? error : new Error("Unknown error occurred"),
        );
      }
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsArrayBuffer(file);
  });
}
